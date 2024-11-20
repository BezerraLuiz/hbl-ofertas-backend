// import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

// export async function authenticate(server: FastifyInstance) {
//   server.decorate(
//     "authenticate",
//     async (request: FastifyRequest, reply: FastifyReply) => {
//       try {
//         await request.jwtVerify();
//       } catch (err) {
//         console.log(err);
//         reply.status(401).send({ error: "Unauthorized" });
//       }
//     }
//   );
// }
