import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/users";
import { createSession, invalidateSession } from "../db";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

export const authRouter = express.Router();

authRouter.use(express.json());

// login handler
authRouter.post("/google/:email", async (req: Request, res: Response) => {
  const email = req.params.email;
  const existingUser = await collections.users.findOne({ email });


  const session = createSession(email, existingUser.name);

  // create access token
  const accessToken = signJWT(
    { email: existingUser.email, name: existingUser.name, sessionId: session.sessionId },
    "5s"
  );

  const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");

  // set access token in cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  });

  // send user back
  return res.send(session);
});

// get the session session

// log out handler
authRouter.get("/google/callback", async (req: Request, res: Response) => {
  // @ts-ignore
  return res.send(req.user);
});

authRouter.delete("/google/logout", async (req: Request, res: Response) => {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  // @ts-ignore
  const session = invalidateSession(req.user.sessionId);

  return res.send(session);
});
