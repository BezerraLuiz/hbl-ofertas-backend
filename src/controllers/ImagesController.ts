import { FastifyReply, FastifyRequest } from "fastify";
import { uploadFile } from "../services/ImagesServices";

export async function uploadImageHandler(req: FastifyRequest, reply: FastifyReply) {
  const data = await req.file();

  // Nome arquivo: data?.filename
  // mimeType: data?.mimetype

  const imagePath = await uploadFile(data?.filename, data?.mimetype, data);

  return reply.status(201).send({ error: false, imagePath });
}