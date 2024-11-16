import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import dotenv from "dotenv";
import path from "path";
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

server.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
});

const port = parseInt(process.env.PORT || "3333", 10);

server
  .listen({ port })
  .then(() => {
    console.log(
      `🚀 HTTP server running on https://hbl-ofertas-backend.vercel.app/`
    );
  })
  .catch((err) => {
    console.error(err);
  });
