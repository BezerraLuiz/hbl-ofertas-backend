import Decimal from "decimal.js";
import { z } from "zod";

export const querySchemaProducts = z.object({
  sku: z.string()
});

export const bodySchemaCreateProducts = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number().transform((value) => new Decimal(value)),
  description: z.string(),
  imageId: z.string()
});

export const bodySchemaUpdateProducts = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number().transform((value) => new Decimal(value)),
  description: z.string(),
});

export const querySchameUpdateProducts = z.object({
  id: z.string()
});