import express from "express";
import { connectToDatabase } from "./services/database.service"
import { eventRouter } from "./routes/events.router";
import { clubRouter } from "./routes/clubs.router";

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        app.use("/events", eventRouter);
        app.use("/clubs", clubRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
