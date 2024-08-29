import { GoogleGenerativeAI } from "@google/generative-ai";

import { aiConfig } from "./config/aiConfig";
import { processImages } from "./ImageProcess";

const genAI = new GoogleGenerativeAI(aiConfig.gemini.apiKey);

// This function is used for a text only model of Gemini AI
export const textAndImage = async (prompt: string, images: string[]) => {
  const model = genAI.getGenerativeModel({
    model: aiConfig.gemini.textAndImageModel,
    safetySettings: aiConfig.gemini.safetySettings,
  });

  let imageParts = await processImages(images);

  try {
    const result = await model.generateContent([prompt, ...imageParts]);
    const chatResponse = result?.response?.text();

    return { result: chatResponse };
  } catch (error) {
    console.error("textAndImage | error", error);
    return { Error: "Uh oh! Caught error while fetching AI response" };
  }
};