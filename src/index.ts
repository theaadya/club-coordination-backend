import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDatabase } from "./services/database.service"
import { eventRouter } from "./routes/events.router";
import { clubRouter } from "./routes/clubs.router";
import { authRouter } from "./routes/auth.router";

const app = express();
const port = 8080; // default port to listen

app.use(cookieParser());
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

connectToDatabase()
    .then(() => {
        app.use("/events", eventRouter);
        app.use("/clubs", clubRouter);
        app.use("/auth", authRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
