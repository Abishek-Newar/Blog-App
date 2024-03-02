"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdate = exports.blogPost = exports.SigninInput = exports.SignupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    password: zod_1.default.string()
});
exports.SigninInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.blogPost = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.blogUpdate = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional()
});
