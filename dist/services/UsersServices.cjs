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

// src/services/UsersServices.ts
var UsersServices_exports = {};
__export(UsersServices_exports, {
  createUser: () => createUser,
  findUserByMail: () => findUserByMail
});
module.exports = __toCommonJS(UsersServices_exports);

// src/lib/Prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/services/UsersServices.ts
async function createUser(mail, password) {
  return prisma.users.create({
    data: {
      mail,
      password
    }
  });
}
async function findUserByMail(mail) {
  const user = await prisma.users.findUniqueOrThrow({
    where: { mail },
    select: { password: true }
  });
  return user.password;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  findUserByMail
});
