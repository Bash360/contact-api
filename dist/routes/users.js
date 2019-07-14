"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const joi_1 = __importDefault(require("@hapi/joi"));
const schema = {
    firstName: joi_1.default.string().min(5).required(),
    lastName: joi_1.default.string().min(5).required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().max(11).required,
    gender: joi_1.default.string().max(6).min(4).required,
    blocked: joi_1.default.number().min(0).max(1).optional
};
router.get('/', function (_req, _res) {
    _res.send('home').status(200);
});
router.get('api/users', (_req, _res) => {
    _res.send(201);
});
router.get('api/users?id', (_req, _res, _next) => {
});
router.get('api/users/blocked', (_req, _res) => {
});
router.post('api/users', (_req, _res) => {
});
router.put('api/users', (_req, _res) => {
});
router.delete('api/users', (_req, _res) => {
});
exports.default = router;
//# sourceMappingURL=users.js.map