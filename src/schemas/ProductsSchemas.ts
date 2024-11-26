import { z } from "zod";

export const querySchemaProducts = z.object({
  sku: z.string()
});
