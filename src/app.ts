import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import dotenv from "dotenv";
import path from "path";
import authenticate from "./middlewares/authenticateMiddleware";
import usuariosRoutes from "./routes/userRoutes";
import productsRoutes from "./routes/productsRoutes";
import imageRoutes from "./routes/imageRoutes";

dotenv.config();

export const server = fastify({ logger: true });

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
server.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
});

// Rota para teste do servidor
server.get("/", async () => {
  console.log("Rota Funcionando!");
  return { message: "Servidor está funcionando!" };
});

// Inicializar o servidor
const port = parseInt(process.env.PORT || "3333", 10);

server
  .listen({ port })
  .then(() => {
    console.log(`🚀 HTTP server running on https://hbl-ofertas-backend.vercel.app/`);
  })
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
  });
