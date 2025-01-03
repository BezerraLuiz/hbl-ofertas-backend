import * as bcrypt from "bcrypt";
import { prisma } from "../lib/Prisma";

export async function encryptPassword() {
  const users = await prisma.users.findMany();
  for (const user of users) {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await prisma.users.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
    }
  }
}

encryptPassword();
