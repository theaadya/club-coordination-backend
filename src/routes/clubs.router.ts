import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Club from "../models/clubs";

export const clubRouter = express.Router();

clubRouter.use(express.json());

clubRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const approvedClubs = (await collections.clubs.find({ status: "Approved" }).toArray()) as unknown as Club[];
        //console.log(clubs);
        res.status(200).send(approvedClubs);
        
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

clubRouter.get("/:clubId", async (req: Request, res: Response) => {
    const clubId = req?.params?.clubId;

    try {
        
        const query = { _id: new ObjectId(clubId) };
        const club = (await collections.clubs.findOne(query)) as unknown as Club;

        if (club) {
            res.status(200).send(club);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

clubRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newClub = req.body as Club;
        const result = await collections.clubs.insertOne(newClub);

        result
            ? res.status(201).send(`Successfully created a new club with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new club.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

clubRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedClub: Club = req.body as Club;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.clubs.updateOne(query, { $set: updatedClub });

        result
            ? res.status(200).send(`Successfully updated club with id ${id}`)
            : res.status(304).send(`Club with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
