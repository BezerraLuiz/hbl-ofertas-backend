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
exports.loginHandler = loginHandler;
const zod_1 = require("zod");
const userService_1 = require("../services/userService");
const jwtUtils_1 = require("../utils/jwtUtils");
function loginHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodySchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            senha: zod_1.z.string(),
        });
        try {
            const { email, senha } = bodySchema.parse(request.body);
            const usuario = yield (0, userService_1.findUserByEmail)(email);
            if (!usuario) {
                return reply.status(401).send({ error: true, message: "Usuário não encontrado" });
            }
            const senhaCorreta = yield (0, userService_1.verifyPassword)(senha, usuario.senha);
            if (!senhaCorreta) {
                return reply.status(401).send({ error: true, message: "Senha incorreta" });
            }
            const token = (0, jwtUtils_1.generateToken)({ id: usuario.id, email: usuario.email });
            return reply.send({ error: false, token, message: "Login bem-sucedido" });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({ error: true, message: "Dados de entrada inválidos" });
            }
            return reply.status(500).send({ error: true, message: "Erro interno do servidor" });
        }
    });
}
