import { FastifyInstance } from "fastify";
import { createUserHandler } from "../controllers/UserController";

export async function userRoutes(server: FastifyInstance) {
  server.post("/users", createUserHandler);
}