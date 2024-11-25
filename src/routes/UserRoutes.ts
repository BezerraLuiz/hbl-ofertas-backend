import { FastifyInstance, FastifyRequest } from "fastify";
import { createUserHandler, verifyCredetials } from "../controllers/UserController";

export async function userRoutes(server: FastifyInstance) {
  server.post("/users/create", createUserHandler);
  server.post("/users", verifyCredetials);

  server.decorate("authenticate", async function (request: FastifyRequest) {
    try {
      await request.jwtVerify();
    } catch (e) {
      throw new Error("Token inválido ou ausente " + e);
    }
  });

  server.get(
    "/protected",
    { preValidation: [server.authenticate] },
    async (request, reply) => {
      return reply.status(200).send({ error: false });
    }
  );
}
