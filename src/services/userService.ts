import {prisma} from "../lib/prisma"
import bcrypt from "bcryptjs";

export async function findUserByEmail(email: string) {
    return prisma.usuarios.findUniqueOrThrow({where: {email}});
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}