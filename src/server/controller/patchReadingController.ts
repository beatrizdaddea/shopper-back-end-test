import { Request, Response } from "express";
import Reading from "../models/reading";

export const confirmReading = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  // Validação dos parâmetros
  if (!measure_uuid || typeof measure_uuid !== 'string') {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "UUID da medição inválido ou ausente"
    });
  }

  if (typeof confirmed_value !== 'number' || isNaN(confirmed_value)) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Valor confirmado inválido ou ausente"
    });
  }

  try {
    // Verifica se a leitura existe
    const reading = await Reading.findOne({ where: { guid: measure_uuid } });

    if (!reading) {
      return res.status(404).json({
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura não encontrada"
      });
    }

    // Verifica se a leitura já foi confirmada
    if (reading.getDataValue('confirmed_value') !== null) {
      return res.status(409).json({
        error_code: "CONFIRMATION_DUPLICATE",
        error_description: "Leitura já confirmada"
      });
    }

    // Atualiza o valor confirmado no banco de dados
    reading.setDataValue('confirmed_value', confirmed_value);
    await reading.save();

    return res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error("confirmReading | Error:", error);
    return res.status(500).json({ error: "An error occurred while processing the request" });
  }
};
