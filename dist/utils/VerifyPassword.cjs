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

// src/utils/VerifyPassword.ts
var VerifyPassword_exports = {};
__export(VerifyPassword_exports, {
  verifyPasswordEqual: () => verifyPasswordEqual,
  verifyPasswordSecurity: () => verifyPasswordSecurity
});
module.exports = __toCommonJS(VerifyPassword_exports);
var import_bcrypt = __toESM(require("bcrypt"), 1);
async function verifyPasswordEqual(password, hashedPassword) {
  return import_bcrypt.default.compare(password, hashedPassword);
}
async function verifyPasswordSecurity(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const errors = [];
  if (!/[a-z]/.test(password)) {
    errors.push("Falta letra min\xFAscula");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Falta letra mai\xFAscula");
  }
  if (!/\d/.test(password)) {
    errors.push("Falta n\xFAmero");
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push("Falta caractere especial");
  }
  if (password.length < 8) {
    errors.push("A senha deve ter pelo menos 8 caracteres");
  }
  if (regex.test(password)) return { error: false };
  return { error: true, message: errors };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyPasswordEqual,
  verifyPasswordSecurity
});
