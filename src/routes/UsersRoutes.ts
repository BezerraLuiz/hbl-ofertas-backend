import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUserHandler, verifyCredentials } from "../controllers/UsersController";

export async function usersRoutes(server: FastifyInstance) {
  server.post("/users/create", createUserHandler);
  server.post("/users", verifyCredentials);

  server.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      await request.jwtVerify();
      return reply.status(200).send({ error: false })
    } catch (e) {
      return reply.status(500).send({ error: true, message: "Token invalid or missing! Error: " + e});
    }
  });

  server.get(
    "/protected",
    { preValidation: [server.authenticate] },
    async (request, reply): Promise<object> => {
      return reply.status(200).send({ error: false });
    }
  );
}
