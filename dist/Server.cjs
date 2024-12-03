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

// src/Server.ts
var Server_exports = {};
__export(Server_exports, {
  google_api_folder_id: () => google_api_folder_id,
  server: () => server
});
module.exports = __toCommonJS(Server_exports);
var import_fastify = __toESM(require("fastify"), 1);
var import_jwt = __toESM(require("@fastify/jwt"), 1);
var import_multipart = __toESM(require("@fastify/multipart"), 1);
var import_cors = __toESM(require("@fastify/cors"), 1);

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
  return (await prisma.users.findUniqueOrThrow({
    where: { mail },
    select: { id: false, mail: false, password: true }
  })).password;
}

// src/schemas/UsersSchemas.ts
var import_zod = require("zod");
var bodySchemaUsers = import_zod.z.object({
  mail: import_zod.z.string(),
  password: import_zod.z.string()
});

// src/utils/EncryptPassword.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
async function encryptPassword() {
  const users = await prisma.users.findMany();
  for (const user of users) {
    if (user.password) {
      const hashedPassword = await import_bcrypt.default.hash(user.password, 10);
      await prisma.users.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
    }
  }
}

// src/utils/VerifyPassword.ts
var import_bcrypt2 = __toESM(require("bcrypt"), 1);
async function verifyPasswordEqual(password, hashedPassword) {
  return import_bcrypt2.default.compare(password, hashedPassword);
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

// src/utils/GenerateToken.ts
function generateToken(payload) {
  return server.jwt.sign(payload);
}

// src/controllers/UsersController.ts
async function createUserHandler(req, reply) {
  try {
    const { mail, password } = bodySchemaUsers.parse(req.body);
    const passSecurity = await verifyPasswordSecurity(password);
    if (passSecurity.error == true) return reply.status(400).send(passSecurity);
    const user = createUser(mail, password);
    if (!user)
      return reply.status(400).send({ error: true, message: "Unable to create user!" });
    encryptPassword();
    return reply.status(201).send({ error: false });
  } catch (e) {
    return reply.status(505).send({ error: true, message: "Internal Error: " + e });
  }
}
async function verifyCredetials(req, reply) {
  try {
    const { mail, password } = bodySchemaUsers.parse(req.body);
    const passworddb = await findUserByMail(mail);
    const credentials = verifyPasswordEqual(password, passworddb);
    if (!credentials) {
      return reply.status(401).send({ error: true, message: "Incorret Password!" });
    }
    const token = generateToken({ mail, password });
    return reply.status(200).send({ error: false, token });
  } catch (e) {
    return reply.status(505).send({ error: true, message: "Internal Error: " + e });
  }
}

// src/routes/UsersRoutes.ts
async function usersRoutes(server2) {
  server2.post("/users/create", createUserHandler);
  server2.post("/users", verifyCredetials);
  server2.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify();
      return reply.status(200).send({ error: false });
    } catch (e) {
      return reply.status(500).send({ error: true, message: "Token invalid or missing! Error: " + e });
    }
  });
  server2.get(
    "/protected",
    { preValidation: [server2.authenticate] },
    async (request, reply) => {
      return reply.status(200).send({ error: false });
    }
  );
}

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
var import_zod2 = require("zod");
var querySchemaProducts = import_zod2.z.object({
  sku: import_zod2.z.string()
});
var bodySchemaCreateProducts = import_zod2.z.object({
  sku: import_zod2.z.string(),
  name: import_zod2.z.string(),
  price: import_zod2.z.number().transform((value) => new import_decimal.default(value)),
  description: import_zod2.z.string(),
  imageId: import_zod2.z.string()
});
var bodySchemaUpdateProducts = import_zod2.z.object({
  sku: import_zod2.z.string(),
  name: import_zod2.z.string(),
  price: import_zod2.z.number().transform((value) => new import_decimal.default(value)),
  description: import_zod2.z.string()
});
var querySchameUpdateProducts = import_zod2.z.object({
  id: import_zod2.z.string()
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
    const existProcut = await getProductBySku(sku);
    if (existProcut)
      return reply.status(400).send({ error: true, message: "Product Exist!" });
    const product = await createProduct(
      sku,
      name,
      price,
      description,
      imageId
    );
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

// src/routes/ProductsRoutes.ts
async function productsRoutes() {
  server.get("/products", getAllProductsHandler);
  server.get("/products:sku", getProductBySkuHandler);
  server.delete("/products/delete:sku", deleteProductHandler);
  server.post("/products", createProductHandler);
  server.put("/products/update", UpdateProductHandler);
}

// src/services/ImagesServices.ts
var import_googleapis = require("googleapis");
async function uploadFile(nameArchive, typeArchive, arquivo) {
  try {
    const auth = new import_googleapis.google.auth.GoogleAuth({
      keyFile: "./google-drive.json",
      scopes: ["https://www.googleapis.com/auth/drive"]
    });
    const driveService = import_googleapis.google.drive({
      version: "v3",
      auth
    });
    const fileMetaData = {
      name: nameArchive,
      parents: [google_api_folder_id]
    };
    const media = {
      mimeType: typeArchive,
      body: arquivo.file
    };
    const response = await driveService.files.create({
      requestBody: fileMetaData,
      media,
      fields: "id"
    });
    return response.data.id;
  } catch (e) {
    console.error("Upload file error: ", e);
  }
}
async function deleteFile(id) {
  try {
    const auth = new import_googleapis.google.auth.GoogleAuth({
      keyFile: "./google-drive.json",
      scopes: ["https://www.googleapis.com/auth/drive"]
    });
    const driveService = import_googleapis.google.drive({
      version: "v3",
      auth
    });
    const response = await driveService.files.delete({
      fileId: id
    });
    return response.status;
  } catch (e) {
    console.error("Upload file error: ", e);
  }
}

// src/schemas/ImagesSchemas.ts
var import_zod3 = require("zod");
var querySchemaImages = import_zod3.z.object({
  id: import_zod3.z.string()
});

// src/controllers/ImagesController.ts
async function uploadImage(req, reply) {
  try {
    const data = await req.file();
    if (!data?.filename)
      return reply.status(400).send({ error: true, message: "Unnamed file!" });
    const imagePath = await uploadFile(data?.filename, data?.mimetype, data);
    return reply.status(201).send({ error: false, imagePath });
  } catch (e) {
    return reply.status(505).send({ error: true, message: "Internal Error: " + e });
  }
}
async function deleteImage(req, reply) {
  try {
    const { id } = querySchemaImages.parse(req.query);
    const response = await deleteFile(id);
    if (!response)
      return reply.status(400).send({ error: true, message: "Incorret ID!" });
    return reply.status(201).send({ error: false, message: "Deleted Image!" });
  } catch (e) {
    return reply.status(505).send({ error: true, message: "Internal Error: " + e });
  }
}

// src/routes/ImagesRoutes.ts
async function imagesRoutes() {
  server.post("/uploads", uploadImage);
  server.delete("/uploads", deleteImage);
}

// src/Server.ts
var dotenv = __toESM(require("dotenv"), 1);
dotenv.config();
var google_api_folder_id = process.env.GOOGLE_API_FOLDER_ID;
var server = (0, import_fastify.default)();
server.register(import_cors.default, {
  origin: true
  // Todas urls podem acessar o backend.
  // Para específicar o acesso será [url dev, url prod].
});
server.register(import_multipart.default);
server.register(import_jwt.default, {
  secret: process.env.JWT_SECRET
});
server.register(usersRoutes);
server.register(productsRoutes);
server.register(imagesRoutes);
server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log(`\u{1F680} Server Is Running!`);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  google_api_folder_id,
  server
});
