"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImagePath = generateImagePath;
const path_1 = __importDefault(require("path"));
function generateImagePath(nome, originalFileName) {
    const timestamp = Date.now();
    return `/products/${nome}_${timestamp}${path_1.default.extname(originalFileName)}`;
}
