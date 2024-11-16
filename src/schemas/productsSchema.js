"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodySchema = exports.paramsSchema = void 0;
const zod_1 = require("zod");
exports.paramsSchema = zod_1.z.object({
    id: zod_1.z.number(),
    sku: zod_1.z.string(),
    nome: zod_1.z.string(),
    valor: zod_1.z.number(),
    descricao: zod_1.z.string(),
    imagePath: zod_1.z.string(),
    createdAt: zod_1.z.date(),
});
exports.bodySchema = zod_1.z.object({
    sku: zod_1.z.string(),
    nome: zod_1.z.string(),
    valor: zod_1.z.number(),
    descricao: zod_1.z.string(),
});
