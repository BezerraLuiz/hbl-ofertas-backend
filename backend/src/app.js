"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const userRoutes_1 = require("./routes/userRoutes");
const productsRoutes_1 = require("./routes/productsRoutes");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const authenticateMiddleware_1 = require("./middlewares/authenticateMiddleware");
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.server = (0, fastify_1.default)({ logger: true });
exports.server.register(cors_1.default, {
    origin: true,
});
exports.server.register(multipart_1.default);
exports.server.register(jwt_1.default, {
    secret: process.env.JWT_SECRET,
});
(0, authenticateMiddleware_1.authenticate)(exports.server).then(e => console.log(e));
exports.server.register(userRoutes_1.usuariosRoutes);
exports.server.register(imageRoutes_1.default);
exports.server.register(productsRoutes_1.productsRoutes);
exports.server
    .listen({
    port: 3333,
})
    .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333");
})
    .catch((err) => {
    console.log(err);
});
