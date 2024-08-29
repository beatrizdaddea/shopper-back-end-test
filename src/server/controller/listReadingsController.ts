import { Request, Response } from "express";
import Reading from "../models/reading";

export const listReadingsController = async (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  try {
    // Validação do tipo de medição
    if (measure_type && !["WATER", "GAS"].includes(measure_type.toString().toUpperCase())) {
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida",
      });
    }

    // Construir a consulta
    const query: any = { customer_code };
    if (measure_type) {
      query.measure_type = measure_type.toString().toUpperCase();
    }

    // Buscar as leituras no banco de dados
    const readings = await Reading.findAll({ where: query });

    // Verificar se foram encontrados registros
    if (readings.length === 0) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
      });
    }

    // Formatar a resposta
    const formattedReadings = readings.map((reading: any) => ({
      measure_uuid: reading.guid,
      measure_datetime: reading.measure_datetime,
      measure_type: reading.measure_type,
      has_confirmed: true, // Ajuste conforme a lógica de confirmação
      image_url: reading.image_link,
    }));

    return res.status(200).json({
      customer_code,
      measures: formattedReadings,
    });
  } catch (error) {
    console.error("listReadingsController | Error:", error);
    return res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "An error occurred while fetching the readings",
    });
  }
};
