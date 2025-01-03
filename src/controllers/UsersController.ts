import { findUserByMail, createUser } from "../services/UsersServices";
import { bodySchemaUsers } from "../schemas/UsersSchemas";
import { FastifyReply, FastifyRequest } from "fastify";
import { encryptPassword } from "../utils/EncryptPassword";
import {
  verifyPasswordEqual,
  verifyPasswordSecurity,
} from "../utils/VerifyPassword";
import { generateToken } from "../utils/GenerateToken";

export async function createUserHandler(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const { mail, password } = bodySchemaUsers.parse(req.body) as {
      mail: string;
      password: string;
    };

    const passSecurity = await verifyPasswordSecurity(password);

    if (passSecurity.error == true) return reply.status(400).send(passSecurity);

    const user = createUser(mail, password);

    if (!user)
      return reply
        .status(400)
        .send({ error: true, message: "Unable to create user!" });

    encryptPassword();

    return reply.status(201).send({ error: false });
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}

export async function verifyCredentials(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const { mail, password } = bodySchemaUsers.parse(req.body) as {
      mail: string;
      password: string;
    };

    const passworddb: string = await findUserByMail(mail);

    const credentials = await verifyPasswordEqual(password, passworddb);

    if (!credentials) {
      return reply
        .status(401)
        .send({ error: true, message: "Incorrect Password!" });
    }

    const token = generateToken({ mail, password });

    return reply.status(200).send({ error: false, token });
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}
