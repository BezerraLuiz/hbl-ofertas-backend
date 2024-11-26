import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUserHandler, verifyCredetials } from "../controllers/UserController";

export async function userRoutes(server: FastifyInstance) {
  server.post("/users/create", createUserHandler);
  server.post("/users", verifyCredetials);

  server.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.status(500).send({ error: true, message: "Token invalid or missing! Error: " + e});
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
