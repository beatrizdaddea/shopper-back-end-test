import { Request, Response } from "express";
import { textAndImage } from "../FileUploader";

export const aiController = async (req: Request, res: Response) => {

  const botReply = await textAndImage(req.body.prompt, req.body.imageParts);

  if (botReply?.Error) {
    return res.status(404).json({ Error: botReply.Error });
  }

  res.status(200).json({ result: botReply.result });
};