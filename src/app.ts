import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static"; // Importando corretamente
import dotenv from "dotenv";
import path from "path"; // Importando o módulo path do Node.js
import { authenticate } from "./middlewares/authenticateMiddleware";
import { usuariosRoutes } from "./routes/userRoutes";
import { productsRoutes } from "./routes/productsRoutes";
import imageRoutes from "./routes/imageRoutes";

dotenv.config();

export const server = fastify({ logger: true });

server.register(cors, {
  origin: true,
});

server.register(fastifyMultipart);

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});

authenticate(server);

server.register(usuariosRoutes);
server.register(imageRoutes);
server.register(productsRoutes);

// Configuração para servir arquivos estáticos
server.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads"), // Caminho para os arquivos
  prefix: "/uploads/", // URL pública para acessar os arquivos
});

server
  .listen({ port: 3333 })
  .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333");
  })
  .catch((err) => {
    console.error(err);
  });