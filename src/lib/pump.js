"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pump = void 0;
const stream_1 = require("stream");
const util_1 = require("util");
exports.pump = (0, util_1.promisify)(stream_1.pipeline);
