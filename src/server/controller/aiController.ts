import { Request, Response } from "express";
import { extractValueFromImage } from "../service/geminiService";
import { generateGUID, generateTemporaryLink } from "../utils/guidGenerator";
import Reading from "../models/reading";
import axios from 'axios';
import Tesseract from 'tesseract.js';

const imageUrlToBase64 = async (imageUrl: string): Promise<string> => {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary').toString('base64');
};

const performOcr = async (base64String: string) => {
  try {
    const result = await Tesseract.recognize(
      Buffer.from(base64String, 'base64'),
      'eng',
      {
        logger: (m: any) => console.log(m),
      }
    );

    return result.data.text;
  } catch (error) {
    console.error('Erro ao realizar OCR:', error);
    throw error;
  }
};

export const aiController = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  // Validação dos parâmetros
  if (!image || typeof image !== 'string') {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Imagem inválida ou ausente"
    });
  }

  if (!customer_code || typeof customer_code !== 'string') {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Código do cliente inválido ou ausente"
    });
  }

  if (!measure_datetime || isNaN(Date.parse(measure_datetime))) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Data e hora da medição inválidas ou ausentes"
    });
  }

  if (!['WATER', 'GAS'].includes(measure_type)) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Tipo de medição inválido ou ausente"
    });
  }

  try {
    const base64Image = await imageUrlToBase64(image);
    const extractedText = await performOcr(base64Image);
    const extractedValue = await extractValueFromImage(extractedText, `Extract ${measure_type} reading from image and return as json, this data may be in Portuguese`);

    if (!extractedValue) {
      return res.status(500).json({ error: "Failed to extract value from image" });
    }

    const existingReading = await Reading.findOne({
      where: {
        customer_code,
        measure_type,
        measure_datetime: new Date(measure_datetime),
      },
    });

    if (existingReading) {
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada"
      });
    }

    const guid = generateGUID();
    const temporaryLink = generateTemporaryLink(image);

    await Reading.create({
      image_link: temporaryLink,
      guid: guid,
      recognized_value: extractedValue,
      customer_code,
      measure_datetime,
      measure_type,
    });

    return res.status(200).json({
      image_url: temporaryLink,
      measure_value: extractedValue,
      measure_uuid: guid,
    });
  } catch (error) {
    console.error("aiController | Error:", error);
    return res.status(500).json({ error: "An error occurred while processing the request" });
  }
};
