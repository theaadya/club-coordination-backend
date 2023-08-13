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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
exports.userRouter = express_1.default.Router();
exports.userRouter.use(express_1.default.json());
exports.userRouter.get("/google/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const name = req.params.name;
        const existingUser = yield database_service_1.collections.users.findOne({ email });
        if (existingUser) {
            // User exists, perform login
            res.status(200).send(`User with email ${email} exists. Perform login.`);
        }
        else {
            // User doesn't exist, perform registration before login
            try {
                const newUser = {
                    name,
                    email,
                    level: "Student"
                };
                const result = yield database_service_1.collections.users.insertOne(newUser);
                res.status(201).send(`User with email ${email} registered and logged in.`);
            }
            catch (error) {
                res.status(500).send("Failed to register user.");
            }
        }
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
}));
//# sourceMappingURL=users.router.js.map