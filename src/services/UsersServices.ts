import { prisma } from "../lib/Prisma";

export async function createUser(
  mail: string,
  password: string
): Promise<object> {
  return prisma.users.create({
    data: {
      mail,
      password,
    },
  });
}

export async function findUserByMail(mail: string): Promise<string> {
  const user = await prisma.users.findUniqueOrThrow({
    where: { mail },
    select: { password: true },
  });

  return user.password;
}
