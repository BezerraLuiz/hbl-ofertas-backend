import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { findUserByEmail, verifyPassword } from "../services/userService";
import { generateToken } from "../utils/jwtUtils";

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    senha: z.string(),
  });

  try {
    const { email, senha } = bodySchema.parse(request.body);
    const usuario = await findUserByEmail(email);

    if (!usuario) {
      return reply.status(401).send({ error: true, message: "Usuário não encontrado" });
    }

    const senhaCorreta = await verifyPassword(senha, usuario.senha);

    if (!senhaCorreta) {
      return reply.status(401).send({ error: true, message: "Senha incorreta" });
    }

    const token = generateToken({ id: usuario.id, email: usuario.email });
    return reply.send({ error: false, token, message: "Login bem-sucedido" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: true, message: "Dados de entrada inválidos" });
    }
    return reply.status(500).send({ error: true, message: "Erro interno do servidor" });
  }
}
