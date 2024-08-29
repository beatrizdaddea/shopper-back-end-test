import axios from "axios";
import mime from "mime-types";

export const urlToGenerativePart = async (url: string): Promise<{ inlineData?: { data: string, mimeType: string }, Error?: string }> => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const mimeType = response.headers["content-type"] || mime.lookup(url);

    if (!mimeType || !mimeType.startsWith("image/")) {
      console.error("processImages | Unsupported image MIME type:", mimeType);
      return { Error: "Unsupported image MIME type" };
    }

    const base64Data = Buffer.from(response.data, "binary").toString("base64");

    return {
      inlineData: {
        data: base64Data,
        mimeType,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("processImages | Error fetching image from URL:", error.message);
    } else {
      console.error("processImages | Unexpected error:", error);
    }
    return { Error: "Error fetching image from URL" };
  }
};

export const processImages = async (images: string[]): Promise<{ inlineData?: { data: string, mimeType: string }, Error?: string }[]> => {
  try {
    const imageParts = await Promise.all(
      images.map(async (img: string) => await urlToGenerativePart(img))
    );

    return imageParts;
  } catch (error) {
    if (error instanceof Error) {
      console.error("processImages | Error:", error.message);
    } else {
      console.error("processImages | Unexpected error:", error);
    }
    return [];
  }
};
