import { z } from "zod";

export const paramsSchema = z.object({
    id: z.number(),
    sku: z.string(),
    nome: z.string(),
    valor: z.number(),
    descricao: z.string(),
    imagePath: z.string(),
    createdAt: z.date(),
})

export const bodySchema = z.object({
    sku: z.string(),
    nome: z.string(),
    valor: z.number(),
    descricao: z.string(),
})