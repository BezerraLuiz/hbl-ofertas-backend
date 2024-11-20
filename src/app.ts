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

// Logando para verificar se a variável de ambiente foi carregada corretamente
console.log(`[${new Date().toISOString()}] ✅ Variáveis de ambiente carregadas.`);

export const server = fastify({ logger: true });

console.log(`[${new Date().toISOString()}] 🛠️ Inicializando servidor Fastify...`);

server.register(cors, {
  origin: "*",
  credentials: true,
  preflight: true,
});
console.log(`[${new Date().toISOString()}] ✅ Plugin CORS registrado com sucesso!`);

server.register(fastifyMultipart);
console.log(`[${new Date().toISOString()}] ✅ Plugin Multipart registrado com sucesso!`);

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});
console.log(`[${new Date().toISOString()}] ✅ Plugin JWT registrado com sucesso!`);

console.log(`[${new Date().toISOString()}] 🔑 Registrando middleware de autenticação...`);
authenticate(server);

server.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
});
console.log(`[${new Date().toISOString()}] ✅ Plugin de arquivos estáticos registrado com sucesso!`);

console.log(`[${new Date().toISOString()}] 🛣️ Registrando rotas...`);
server.register(usuariosRoutes);
server.register(imageRoutes);
server.register(productsRoutes);

server.get("/", async () => {
  // Logando quando a rota de teste é acessada
  console.log(`[${new Date().toISOString()}] 🌐 Acessada a rota de teste!`);
  return { message: "Rota Funcionando!" };
});

const port = parseInt(process.env.PORT || "3333", 10);

// Logando quando o servidor está tentando iniciar
console.log(`[${new Date().toISOString()}] 🚀 Tentando iniciar servidor na porta ${port}...`);

server
  .listen({ port })
  .then(() => {
    console.log(
      `[${new Date().toISOString()}] 🚀 Servidor HTTP iniciado com sucesso em https://hbl-ofertas-backend.vercel.app/`
    );
  })
  .catch((err) => {
    console.error(`[${new Date().toISOString()}] ❌ Erro ao iniciar o servidor:`, err);
  });
