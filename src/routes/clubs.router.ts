import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Club from "../models/clubs";

export const clubRouter = express.Router();

clubRouter.use(express.json());

clubRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const clubs = (await collections.clubs.find({}).toArray()) as unknown as Club[];
        //console.log(clubs);
        res.status(200).send(clubs);
        
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
