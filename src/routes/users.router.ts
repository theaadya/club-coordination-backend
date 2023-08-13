import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/users";

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const allusers = (await collections.users.find({}).toArray()) as unknown as User[];
        res.status(200).send(allusers);
        
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
