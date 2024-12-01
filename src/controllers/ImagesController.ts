import { FastifyReply, FastifyRequest } from "fastify";
import { uploadFile } from "../services/ImagesServices";

export async function uploadImageHandler(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const data = await req.file();

    if (!data?.filename)
      return reply.status(201).send({ error: true, message: "Unnamed file!" });

    const imagePath = await uploadFile(data?.filename, data?.mimetype, data);

    return reply.status(201).send({ error: false, imagePath });
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}
