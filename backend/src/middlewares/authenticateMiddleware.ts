import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(server: FastifyInstance) {
    server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            reply.status(500).send({ message: error });
        }
    });
}
