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
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.clubRouter = express_1.default.Router();
exports.clubRouter.use(express_1.default.json());
exports.clubRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const approvedClubs = (yield database_service_1.collections.clubs.find({ status: "Approved" }).toArray());
        //console.log(clubs);
        res.status(200).send(approvedClubs);
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
}));
exports.clubRouter.get("/:clubId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const clubId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.clubId;
    try {
        const query = { _id: new mongodb_1.ObjectId(clubId) };
        const club = (yield database_service_1.collections.clubs.findOne(query));
        if (club) {
            res.status(200).send(club);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
exports.clubRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newClub = req.body;
        const result = yield database_service_1.collections.clubs.insertOne(newClub);
        result
            ? res.status(201).send(`Successfully created a new club with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new club.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
exports.clubRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const updatedClub = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.clubs.updateOne(query, { $set: updatedClub });
        result
            ? res.status(200).send(`Successfully updated club with id ${id}`)
            : res.status(304).send(`Club with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=clubs.router.js.map