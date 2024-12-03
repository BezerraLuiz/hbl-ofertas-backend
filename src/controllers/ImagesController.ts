import { FastifyReply, FastifyRequest } from "fastify";
import { deleteFile, uploadFile } from "../services/ImagesServices";
import { querySchemaImages } from "../schemas/ImagesSchemas";

export async function uploadImage(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const data = await req.file();

    if (!data?.filename)
      return reply.status(400).send({ error: true, message: "Unnamed file!" });

    const imageId = await uploadFile(data?.filename, data?.mimetype, data);

    return reply.status(201).send({ error: false, id: imageId });
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}

export async function deleteImage(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const { id } = querySchemaImages.parse(req.query);

    const response = await deleteFile(id);

    if (!response)
      return reply.status(400).send({ error: true, message: "Incorret ID!" });

    return reply.status(201).send({ error: false, message: "Deleted Image!" });
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}
