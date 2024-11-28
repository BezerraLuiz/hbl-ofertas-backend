import { z } from "zod";

export const querySchemaProducts = z.object({
  sku: z.string()
});

export const bodySchemaProducts = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
});
