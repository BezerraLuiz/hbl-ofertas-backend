import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { usuariosRoutes } from "./routes/userRoutes";
import { productsRoutes } from "./routes/productsRoutes";
import fastifyMultipart from "@fastify/multipart";
import { authenticate } from "./middlewares/authenticateMiddleware";
import imageRoutes from "./routes/imageRoutes";
import dotenv from 'dotenv';

dotenv.config();  

export const server = fastify({ logger: true });

server.register(cors, {
  origin: true,
});

server.register(fastifyMultipart);

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});

authenticate(server).then(e => console.log(e));

server.register(usuariosRoutes);
server.register(imageRoutes);
server.register(productsRoutes);

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333");
  })
  .catch((err) => {
    console.log(err);
  });
