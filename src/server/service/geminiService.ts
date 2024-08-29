import { GoogleGenerativeAI } from "@google/generative-ai";
import { aiConfig } from "../config/aiConfig";

const genAI = new GoogleGenerativeAI(aiConfig.gemini.apiKey);

export const extractValueFromImage = async (imageBase64: string, prompt: string) => {
  const model = genAI.getGenerativeModel({
    model: aiConfig.gemini.textAndImageModel,
    safetySettings: aiConfig.gemini.safetySettings,
  });

  try {
    const result = await model.generateContent([prompt, imageBase64]);
    const extractedValue = result?.response?.text();

    return extractedValue;
  } catch (error) {
    console.error("Error extracting value from image:", error);
    throw new Error("Failed to process image");
  }
};
