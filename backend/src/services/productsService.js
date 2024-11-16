"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.getProductBySku = getProductBySku;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.createProduct = createProduct;
const prisma_1 = require("../lib/prisma");
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.produtos.findMany({ orderBy: { nome: "asc" } });
    });
}
function getProductBySku(sku) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.produtos.findMany({ where: { sku } });
    });
}
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.produtos.delete({ where: { id } });
    });
}
function updateProduct(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, nome, valor, descricao, sku, }) {
        return prisma_1.prisma.produtos.update({
            where: { id },
            data: { sku, nome, valor, descricao },
        });
    });
}
function createProduct(_a) {
    return __awaiter(this, arguments, void 0, function* ({ sku, nome, valor, descricao, imagePath, }) {
        return prisma_1.prisma.produtos.create({
            data: {
                sku,
                nome,
                valor,
                descricao,
                imagePath,
            },
        });
    });
}
