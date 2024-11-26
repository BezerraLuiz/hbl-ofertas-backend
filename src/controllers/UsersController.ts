import { findUserByMail, createUser } from "../services/UserServices"; 
import { bodySchemaUser } from "../schemas/UserSchemas";
import { FastifyReply, FastifyRequest } from "fastify";
import { encryptPassword } from "../utils/EncryptPassword";
import { verifyPasswordEqual, verifyPasswordSecurity } from "../utils/VerifyPassword";
import { generateToken } from "../utils/GenerateToken";

export async function createUserHandler(req: FastifyRequest, reply: FastifyReply) {
  const { mail, password } = bodySchemaUser.parse(req.body) as { mail: string, password: string };

  const passSecurity = await verifyPasswordSecurity(password);

  if (passSecurity.error == true) return reply.status(400).send( passSecurity );

  const user = createUser(mail, password);

  if (!user) return reply.status(400).send({ error: true, message: "Unable to create user!" });

  encryptPassword();

  return reply.status(201).send({ error: false }); 
}

export async function verifyCredetials(req: FastifyRequest, reply: FastifyReply) {
  const { mail, password } = bodySchemaUser.parse(req.body) as { mail: string, password: string }; 

  const passworddb: string = await findUserByMail(mail);

  const credentials = verifyPasswordEqual(password, passworddb);

  if (!credentials) {
    return reply.status(401).send({ error: true, message: "Incorret Password!" });
  };

  const token = generateToken({ mail, password });

  return reply.status(200).send({ error: false, token });
}