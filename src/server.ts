import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { usersRoutes } from "./routes/UsersRoutes";

export const server = fastify();

server.register(cors, {
  origin: true, // Todas urls podem acessar o backend.
  // Para específicar o acesso será [url dev, url prod].
});

// JWT
server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string
});

// Routes:
server.register(usersRoutes);

server
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log(`🚀 Server Is Running!`);
  });
