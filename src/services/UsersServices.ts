import { prisma } from "../lib/Prisma";

export async function createUser(mail: string, password: string) {
  return prisma.users.create({
    data: {
      mail,
      password,
    },
  });
}

export async function findUserByMail(mail: string): Promise<string> {
  return (
    await prisma.users.findUniqueOrThrow({
      where: { mail },
      select: { id: false, mail: false, password: true },
    })
  ).password;
}
