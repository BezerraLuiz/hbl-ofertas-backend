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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsHandler = getAllProductsHandler;
exports.getProductBySkuHandler = getProductBySkuHandler;
exports.deleteProductHandler = deleteProductHandler;
exports.updateProductHandler = updateProductHandler;
exports.createProductHandler = createProductHandler;
const productsService_1 = require("../services/productsService");
const productsSchema_1 = require("../schemas/productsSchema");
const productsService_2 = require("../services/productsService");
function getAllProductsHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, productsService_1.getAllProducts)();
            if (products.length === 0) {
                return reply
                    .status(404)
                    .send({ message: "Não há produtos cadastrados!" });
            }
            return reply.status(200).send(products.map(({ id, sku, nome, valor, descricao, imagePath }) => ({
                id,
                sku,
                nome,
                valor,
                descricao,
                imagePath
            })));
        }
        catch (e) {
            console.log(e);
            return reply.status(500).send({ message: "Erro ao buscar os produtos!" });
        }
    });
}
function getProductBySkuHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, productsService_1.getAllProducts)();
            if (products.length === 0) {
                return reply
                    .status(404)
                    .send({ message: "Não há produtos cadastrados!" });
            }
            const { sku } = request.query;
            const product = yield (0, productsService_2.getProductBySku)(sku);
            if (!product) {
                return reply.status(404).send({ message: "Produto não encontrado!" });
            }
            return reply.status(200).send(product);
        }
        catch (e) {
            console.log(e);
            return reply.status(500).send({ message: "Erro ao procurar produto!" });
        }
    });
}
function deleteProductHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, productsService_1.getAllProducts)();
            if (products.length === 0) {
                return reply
                    .status(404)
                    .send({ message: "Não há produtos cadastrados!" });
            }
            let { id } = request.query;
            id = parseInt(id);
            const deletedProduct = yield (0, productsService_1.deleteProduct)(id);
            if (!deletedProduct) {
                return reply.status(404).send({ message: "Produto não encontrado!" });
            }
            return reply.status(200).send(deletedProduct);
        }
        catch (e) {
            console.log(e);
            return reply.status(500).send({ message: "Erro ao procurar produto!" });
        }
    });
}
function updateProductHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id } = request.query;
            id = parseInt(id);
            const { sku, nome, valor, descricao } = productsSchema_1.bodySchema.parse(request.body);
            const updatedProduct = yield (0, productsService_1.updateProduct)({
                id,
                sku,
                nome,
                valor,
                descricao,
            });
            return reply.status(200).send(updatedProduct);
        }
        catch (e) {
            console.log(e);
            return reply
                .status(500)
                .send({ message: "Não foi possível atualizar o produto!" });
        }
    });
}
function createProductHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            let sku, nome, valor, descricao;
            const imagePath = request.query.imagePath;
            if (request.isMultipart()) {
                let i = 0;
                try {
                    for (var _d = true, _e = __asyncValues(request.parts()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                        _c = _f.value;
                        _d = false;
                        const part = _c;
                        if (part) {
                            switch (part.fieldname) {
                                case "nome":
                                    nome = part.value;
                                    break;
                                case "sku":
                                    sku = part.value;
                                    break;
                                case "valor":
                                    valor = Number(part.value);
                                    break;
                                case "descricao":
                                    descricao = part.value;
                                    break;
                                default:
                                    break;
                            }
                        }
                        i += 1;
                        if (i == 5) {
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (!nome || !sku || valor === undefined || !descricao) {
                throw new Error("Todos os campos são obrigatórios!");
            }
            yield (0, productsService_1.createProduct)({ sku, nome, valor, descricao, imagePath });
            return reply.status(201).send({ message: "Produto criado com sucesso!" });
        }
        catch (e) {
            console.error("Erro ao criar produto:", e);
            return reply
                .status(500)
                .send({ message: "Não foi possível criar o produto! " + e });
        }
    });
}
