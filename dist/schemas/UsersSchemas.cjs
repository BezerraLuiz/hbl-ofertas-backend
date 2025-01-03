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

// src/schemas/UsersSchemas.ts
var UsersSchemas_exports = {};
__export(UsersSchemas_exports, {
  bodySchemaUsers: () => bodySchemaUsers
});
module.exports = __toCommonJS(UsersSchemas_exports);
var import_zod = require("zod");
var bodySchemaUsers = import_zod.z.object({
  mail: import_zod.z.string(),
  password: import_zod.z.string()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bodySchemaUsers
});
