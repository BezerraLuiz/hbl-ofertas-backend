import { z } from "zod";

export const querySchemaImages = z.object({
  id: z.string()
});