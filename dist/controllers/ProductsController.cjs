"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/ProductsController.ts
var ProductsController_exports = {};
__export(ProductsController_exports, {
  UpdateProductHandler: () => UpdateProductHandler,
  createProductHandler: () => createProductHandler,
  deleteProductHandler: () => deleteProductHandler,
  getAllProductsHandler: () => getAllProductsHandler,
  getProductBySkuHandler: () => getProductBySkuHandler
});
module.exports = __toCommonJS(ProductsController_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/services/ProductsServices.ts
async function quantityProducts() {
  return prisma.products.count();
}
async function getAllProducts() {
  const products = await prisma.products.findMany({
    orderBy: {
      createdAt: "asc"
    }
  });
  return products.map((product) => {
    return {
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price,
      description: product.description,
      imageId: product.imageId,
      createdAt: product.createdAt
    };
  });
}
async function getProductBySku(sku) {
  return prisma.products.findUniqueOrThrow({ where: { sku } });
}
async function deleteProduct(sku) {
  return prisma.products.delete({ where: { sku } });
}
async function createProduct(sku, name, price, description, imageId) {
  return prisma.products.create({
    data: {
      sku,
      name,
      price,
      description,
      imageId
    }
  });
}
async function updateProduct(id, sku, name, price, description) {
  return prisma.products.update({
    where: { id },
    data: {
      sku,
      name,
      price,
      description
    }
  });
}

// src/schemas/ProductsSchemas.ts
var import_decimal = __toESM(require("decimal.js"), 1);
var import_zod = require("zod");
var querySchemaProducts = import_zod.z.object({
  sku: import_zod.z.string()
});
var bodySchemaCreateProducts = import_zod.z.object({
  sku: import_zod.z.string(),
  name: import_zod.z.string(),
  price: import_zod.z.number().transform((value) => new import_decimal.default(value)),
  description: import_zod.z.string(),
  imageId: import_zod.z.string()
});
var bodySchemaUpdateProducts = import_zod.z.object({
  sku: import_zod.z.string(),
  name: import_zod.z.string(),
  price: import_zod.z.number().transform((value) => new import_decimal.default(value)),
  description: import_zod.z.string()
});
var querySchameUpdateProducts = import_zod.z.object({
  id: import_zod.z.string()
});

// src/controllers/ProductsController.ts
async function getAllProductsHandler(req, reply) {
  try {
    const quantity = await quantityProducts();
    if (!quantity)
      return reply.status(404).send({ error: true, message: "No products registered!" });
    return getAllProducts();
  } catch (e) {
    return reply.status(505).send({ error: true, message: "Internal Error: " + e });
  }
}
async function getProductBySkuHandler(req, reply) {
  try {
    const quantity = await quantityProducts();
    if (!quantity)
      return reply.status(404).send({ error: true, message: "No products registered!" });
    const { sku } = querySchemaProducts.parse(req.query);
    const product = await getProductBySku(sku);
    if (!product)
      reply.status(404).send({ error: true, message: "Product not found!" });
    return reply.status(200).send({ error: false, product });
  } catch (e) {
    return reply.status(505).send({ error: true, message: "Internal Error: " + e });
  }
}
async function deleteProductHandler(req, reply) {
  try {
    const { sku } = querySchemaProducts.parse(req.query);
    return deleteProduct(sku);
  } catch (e) {
    return reply.status(505).send({ error: true, message: "Internal Error: " + e });
  }
}
async function createProductHandler(req, reply) {
  try {
    const { sku, name, price, description, imageId } = bodySchemaCreateProducts.parse(req.body);
    const product = await createProduct(sku, name, price, description, imageId);
    if (!product)
      return reply.status(400).send({ error: true, message: "Error creating the product!" });
    return reply.status(201).send({ error: false, product });
  } catch (e) {
    return reply.status(505).send({ error: true, message: "Internal Error: " + e });
  }
}
async function UpdateProductHandler(req, reply) {
  try {
    const { sku, name, price, description } = bodySchemaUpdateProducts.parse(
      req.body
    );
    const { id } = querySchameUpdateProducts.parse(req.query);
    const product = await updateProduct(id, sku, name, price, description);
    if (!product)
      return reply.status(400).send({ error: true, message: "Error creating the product!" });
    return reply.status(200).send({ error: false, product });
  } catch (e) {
    return reply.status(505).send({ error: true, message: "Internal Error: " + e });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateProductHandler,
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductBySkuHandler
});
