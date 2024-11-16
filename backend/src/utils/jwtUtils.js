"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const app_1 = require("../app");
function generateToken(payload) {
    return app_1.server.jwt.sign(payload);
}
