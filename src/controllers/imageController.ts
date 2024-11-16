import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import { pump } from '../lib/pump';
import { generateImagePath } from '../utils/imagePath';
import path from 'path';
import { fileURLToPath } from 'url';

// Defina __dirname para módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  const fullImagePath = path.join(__dirname, '../../../frontend/public', imagePath);

  const dir = path.dirname(fullImagePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await pump(data.file, fs.createWriteStream(fullImagePath));

  return { imagePath };
}
