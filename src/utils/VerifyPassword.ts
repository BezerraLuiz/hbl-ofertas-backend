import bcrypt from "bcrypt";

interface PasswordSecurityResponse {
  error: boolean,
  message?: string[]
}

export async function verifyPasswordEqual(password: string, hashedPassword: string): Promise<object> {
  const validate = await bcrypt.compare(password, hashedPassword);

  return { error: true, validate };
}

export async function verifyPasswordSecurity(password: string): Promise<PasswordSecurityResponse> {
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