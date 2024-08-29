import { v4 as uuidv4 } from "uuid";

export const generateGUID = (): string => {
  return uuidv4();
};

export const generateTemporaryLink = (imageBase64: string): string => {
  // Aqui, você pode implementar a lógica para armazenar a imagem temporariamente
  // e retornar um link para acessá-la. Por exemplo, armazenando no S3 e retornando o link
  return `https://temporary-link.com/${generateGUID()}`;
};
