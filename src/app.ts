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

export default function buildServer() {
  const server = fastify({ logger: true });

  server.register(cors, {
    origin: "*",
    credentials: true,
    preflight: true,
  });

  server.register(fastifyMultipart);
  server.register(fastifyJwt, { secret: process.env.JWT_SECRET as string });
  authenticate(server);

  server.register(usuariosRoutes);
  server.register(imageRoutes);
  server.register(productsRoutes);

  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  server.register(fastifyStatic, {
    root: path.join(__dirname, "../uploads"),
    prefix: "/uploads/",
  });

  server.get("/", async (request, reply) => {
    return reply.status(200).send(console.log("Tudo Funcionando!"));
  });

  return server;
}
