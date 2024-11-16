import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { loginHandler } from "../controllers/usersController";

export async function usuariosRoutes(server: FastifyInstance) {
  server.post("/usuarios", loginHandler);

  server.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
        console.log(err)
        reply.status(401).send({ error: "Token inválido ou ausente" });
    }
  });

  server.get(
    "/protected",
    { preValidation: [server.authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.status(200).send({ message: "Acesso concedido!" });
    }
  );
}
