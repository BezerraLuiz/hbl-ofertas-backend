import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function encryptPasswords() {
    const users = await prisma.usuarios.findMany();

    for (const user of users) {
        if (user.senha) {
            // Verifique se a senha já está criptografada
            if (!user.senha.startsWith('$2a$')) {
                // Criptografa a senha
                const hashedPassword = await bcrypt.hash(user.senha, 10);

                // Atualiza a senha no banco de dados
                await prisma.usuarios.update({
                    where: { id: user.id },
                    data: { senha: hashedPassword },
                });

                console.log(`Senha do usuário ${user.email} foi criptografada com sucesso.`);
            }
        }
    }

    console.log('Todas as senhas foram criptografadas.');
}

encryptPasswords()
    .then(() => prisma.$disconnect())
    .catch((error) => {
        console.error(error);
        prisma.$disconnect();
    });
