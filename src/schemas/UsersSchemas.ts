import { z } from "zod";

export const bodySchemaUser = z.object({
  mail: z.string(),
  password: z.string(),
});
