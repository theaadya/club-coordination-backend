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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
const db_1 = require("../db");
const jwt_utils_1 = require("../utils/jwt.utils");
exports.authRouter = express_1.default.Router();
exports.authRouter.use(express_1.default.json());
// login handler
exports.authRouter.post("/google/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const existingUser = yield database_service_1.collections.users.findOne({ email });
    const session = db_1.createSession(email, existingUser.name);
    // create access token
    const accessToken = jwt_utils_1.signJWT({ email: existingUser.email, name: existingUser.name, sessionId: session.sessionId }, "5s");
    const refreshToken = jwt_utils_1.signJWT({ sessionId: session.sessionId }, "1y");
    // set access token in cookie
    res.cookie("accessToken", accessToken, {
        maxAge: 300000,
        httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10,
        httpOnly: true,
    });
    // send user back
    return res.send(session);
}));
// get the session session
// log out handler
exports.authRouter.delete("/google/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    return res.send(req.user);
}));
exports.authRouter.delete("/google/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
    });
    res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
    });
    // @ts-ignore
    const session = db_1.invalidateSession(req.user.sessionId);
    return res.send(session);
}));
//# sourceMappingURL=auth.router.js.map