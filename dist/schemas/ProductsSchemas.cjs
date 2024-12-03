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

// src/schemas/ProductsSchemas.ts
var ProductsSchemas_exports = {};
__export(ProductsSchemas_exports, {
  bodySchemaCreateProducts: () => bodySchemaCreateProducts,
  bodySchemaUpdateProducts: () => bodySchemaUpdateProducts,
  querySchameUpdateProducts: () => querySchameUpdateProducts,
  querySchemaProducts: () => querySchemaProducts
});
module.exports = __toCommonJS(ProductsSchemas_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bodySchemaCreateProducts,
  bodySchemaUpdateProducts,
  querySchameUpdateProducts,
  querySchemaProducts
});
