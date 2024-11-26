import { z } from "zod";

export const bodySchemaUsers = z.object({
  mail: z.string(),
  password: z.string(),
});
