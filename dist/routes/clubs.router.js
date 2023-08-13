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
exports.clubRouter = void 0;
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
exports.clubRouter = express_1.default.Router();
exports.clubRouter.use(express_1.default.json());
exports.clubRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubs = (yield database_service_1.collections.clubs.find({}).toArray());
        //console.log(clubs);
        res.status(200).send(clubs);
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
}));
//# sourceMappingURL=clubs.router.js.map