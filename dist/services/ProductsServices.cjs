"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/ProductsServices.ts
var ProductsServices_exports = {};
__export(ProductsServices_exports, {
  createProduct: () => createProduct,
  deleteProduct: () => deleteProduct,
  getAllProducts: () => getAllProducts,
  getProductBySku: () => getProductBySku,
  quantityProducts: () => quantityProducts,
  updateProduct: () => updateProduct
});
module.exports = __toCommonJS(ProductsServices_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductBySku,
  quantityProducts,
  updateProduct
});
