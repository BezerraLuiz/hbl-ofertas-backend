import fastify, { FastifyInstance } from "fastify";
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

function validateEnvVariables(): void {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
}

validateEnvVariables();

export default function buildServer(): FastifyInstance {
  const server: FastifyInstance = fastify({ logger: true });

  server.register(cors, {
    origin: "*",
    credentials: true,
    preflight: true,
  });

  server.register(fastifyMultipart);

  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
  });

  authenticate(server);

  server.register(usuariosRoutes);
  server.register(imageRoutes);
  server.register(productsRoutes);

  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  server.register(fastifyStatic, {
    root: path.join(__dirname, "../uploads"),
    prefix: "/uploads/",
  });

  const port = parseInt(process.env.PORT || "3333", 10);

  server.get("/", async (_request, reply) => {
    return reply.status(200).send({ message: "Tudo Funcionando!" });
  });

  const startServer = async () => {
    try {
      await server.listen({ port, host: "0.0.0.0" });
      console.log(`🚀 Server is running on port ${port}`);
    } catch (error) {
      server.log.error(error);
      process.exit(1);
    }
  };

  startServer();

  return server;
}
