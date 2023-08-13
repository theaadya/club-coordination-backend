import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/users";

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/google/:email", async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const name = req.params.name;
        const existingUser = await collections.users.findOne({ email });

        if (existingUser) {
            // User exists, perform login
            res.status(200).send(`User with email ${email} exists. Perform login.`);
        } else {
            // User doesn't exist, perform registration before login
            try{
                const newUser = {
                    name,
                    email,
                    level: "Student"
                };

                const result = await collections.users.insertOne(newUser);
                res.status(201).send(`User with email ${email} registered and logged in.`);
            } catch(error) {
                res.status(500).send("Failed to register user.");
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

