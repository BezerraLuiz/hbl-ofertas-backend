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
exports.usuariosRoutes = usuariosRoutes;
const usersController_1 = require("../controllers/usersController");
function usuariosRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.post("/usuarios", usersController_1.loginHandler);
        server.decorate("authenticate", function (request) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield request.jwtVerify();
                }
                catch (e) {
                    throw new Error("Token inválido ou ausente " + e);
                }
            });
        });
        server.get('/protected', { preValidation: [server.authenticate] }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return reply.status(200).send({ message: "Acesso concedido!" });
        }));
    });
}
