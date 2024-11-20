import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import { pump } from '../lib/pump.js';
import { generateImagePath } from '../utils/imagePath.js';
import path from 'path';

export async function uploadImageHandler(request: FastifyRequest, reply: FastifyReply) {
  const data = await request.file();
  console.log("DATA: ", data);

  const { nome } = request.query as { nome: string };

  if (!data) {
    return reply.status(400).send({ message: "Imagem é necessária!" });
  }

  if (!nome) {
    return reply.status(400).send({ message: "Nome do produto é necessário!" });
  }

  const imagePath = generateImagePath(nome, data.filename);

  // Caminho onde as imagens serão salvas no backend
  const uploadDir = path.join(__dirname, '../uploads'); // Ajuste conforme necessário
  const fullImagePath = path.join(uploadDir, imagePath);

  const dir = path.dirname(fullImagePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await pump(data.file, fs.createWriteStream(fullImagePath));

  // URL pública para acessar a imagem
  const publicImageUrl = `https://seu-backend.com/uploads/${imagePath}`; // Atualize com o domínio do backend

  return { imageUrl: publicImageUrl };
}
