import { Request, Response } from "express";
import { extractValueFromImage } from "../service/geminiService";
import { generateGUID, generateTemporaryLink } from "../utils/guidGenerator";

export const aiController = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  try {
    const extractedValue = await extractValueFromImage(image, `Extract ${measure_type} reading from image`);

    if (!extractedValue) {
      return res.status(500).json({ error: "Failed to extract value from image" });
    }

    const guid = generateGUID();
    const temporaryLink = generateTemporaryLink(image);

    return res.status(200).json({
      image_link: temporaryLink,
      guid: guid,
      recognized_value: extractedValue,
    });
  } catch (error) {
    console.error("aiController | Error:", error);
    return res.status(500).json({ error: "An error occurred while processing the request" });
  }
};
