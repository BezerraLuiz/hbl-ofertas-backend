import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import cors from "@fastify/cors";
import { usersRoutes } from "./routes/UsersRoutes";
import { productsRoutes } from "./routes/ProductsRoutes";
import { imagesRoutes } from "./routes/ImagesRoutes";

export const server = fastify();

server.register(cors, {
  origin: true, // Todas urls podem acessar o backend.
  // Para específicar o acesso será [url dev, url prod].
});

server.register(fastifyMultipart);

// JWT
server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string
});

// Routes:
server.register(usersRoutes);
server.register(productsRoutes);
server.register(imagesRoutes);

server
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log(`🚀 Server Is Running!`);
  });
