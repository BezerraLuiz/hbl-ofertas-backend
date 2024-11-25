import bcrypt from "bcrypt";

export async function verifyPasswordEqual(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function verifyPasswordSecurity(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const errors = [];

    if (!/[a-z]/.test(password)) {
      errors.push("Falta letra minúscula");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Falta letra maiúscula");
    }
    if (!/\d/.test(password)) {
      errors.push("Falta número");
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push("Falta caractere especial");
    }
    if (password.length < 8) {
      errors.push("A senha deve ter pelo menos 8 caracteres");
    }

  if (regex.test(password)) return { error: false };
  
  return { error: true, message: errors };
}