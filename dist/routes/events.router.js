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
exports.eventRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.eventRouter = express_1.default.Router();
exports.eventRouter.use(express_1.default.json());
exports.eventRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = (yield database_service_1.collections.events.find({}).toArray());
        res.status(200).send(event);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.eventRouter.get("/approved", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const approvedEvents = (yield database_service_1.collections.events.find({ status: "approved" }).toArray());
        res.status(200).send(approvedEvents);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.eventRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const event = (yield database_service_1.collections.events.findOne(query));
        if (event) {
            res.status(200).send(event);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
exports.eventRouter.post("/requests", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = req.body;
        const result = yield database_service_1.collections.events.insertOne(newEvent);
        result
            ? res.status(201).send(`Successfully created a new event with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new event.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
exports.eventRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const updatedEvent = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.events.updateOne(query, { $set: updatedEvent });
        result
            ? res.status(200).send(`Successfully updated event with id ${id}`)
            : res.status(304).send(`Event with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
exports.eventRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.events.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed event with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove event with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Event with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
exports.eventRouter.post("/:id/registrations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { email } = req.body; // Assuming you send the email in the request body
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const update = { $push: { participants: email } }; // Push the email into the participants array
        const result = yield database_service_1.collections.events.updateOne(query, update);
        if (result.modifiedCount > 0) {
            res.status(200).send(`Successfully updated event with id ${id}`);
        }
        else {
            res.status(304).send(`Event with id: ${id} not updated`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=events.router.js.map