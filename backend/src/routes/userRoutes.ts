import { FastifyInstance, FastifyRequest } from "fastify";
import { loginHandler } from "../controllers/usersController";

export async function usuariosRoutes(server: FastifyInstance) {
    server.post("/usuarios", loginHandler);

    server.decorate("authenticate", async function(request: FastifyRequest) {
        try {
            await request.jwtVerify();
        } catch (e) {
            throw new Error("Token inválido ou ausente " + e);
        }
    });

    server.get('/protected', { preValidation: [server.authenticate] }, async (request, reply) => {
        return reply.status(200).send({ message: "Acesso concedido!" });
    });
}