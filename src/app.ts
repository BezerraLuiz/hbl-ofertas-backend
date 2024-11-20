import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import dotenv from "dotenv";
import path from "path";
import authenticate from "./middlewares/authenticateMiddleware.js";
import usuariosRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();

// Função que retorna a instância do Fastify
export default function buildServer() {
  const server = fastify({ logger: true });

  // Ignorar requisições para favicon.ico e retornar 204 (No Content)
  server.get("/favicon.ico", async (request, reply) => {
    return reply.status(204).send();
  });

  // Configuração do CORS
  server.register(cors, {
    origin: "*",
    credentials: true,
    preflight: true,
  });

  // Registro do multipart para upload de arquivos
  server.register(fastifyMultipart);

  // Registro do JWT para autenticação
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
  });

  // Chamada do middleware de autenticação
  authenticate(server);

  // Registrar as rotas
  server.register(usuariosRoutes);
  server.register(imageRoutes);
  server.register(productsRoutes);

  // Servir arquivos estáticos da pasta uploads
  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  // Registrando o diretório de uploads
  server.register(fastifyStatic, {
    root: path.join(__dirname, "../uploads"),
    prefix: "/uploads/",
  });

  // Rota para teste do servidor
  server.get("/", async () => {
    console.log("Rota Funcionando!");
    return { message: "Servidor está funcionando!" };
  });

  return server;
}
