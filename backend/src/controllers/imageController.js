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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageHandler = uploadImageHandler;
const fs_1 = __importDefault(require("fs"));
const pump_1 = require("../lib/pump");
const imagePath_1 = require("../utils/imagePath");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
// Defina __dirname para módulos ESM
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
function uploadImageHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield request.file();
        console.log("DATA: ", data);
        const { nome } = request.query;
        if (!data) {
            return reply.status(400).send({ message: "Imagem é necessária!" });
        }
        if (!nome) {
            return reply.status(400).send({ message: "Nome do produto é necessário!" });
        }
        const imagePath = (0, imagePath_1.generateImagePath)(nome, data.filename);
        const fullImagePath = path_1.default.join(__dirname, '../../../frontend/public', imagePath);
        const dir = path_1.default.dirname(fullImagePath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        yield (0, pump_1.pump)(data.file, fs_1.default.createWriteStream(fullImagePath));
        return { imagePath };
    });
}
