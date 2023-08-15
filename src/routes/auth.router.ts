import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { createSession, invalidateSession } from "../db";
import { signJWT } from "../utils/jwt.utils";
import { requireUser } from "../middleware/requireUser";

export const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post("/api/session", async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await collections.users.findOne({ email });
  const session = createSession(email, user.name);

  // create access token
  const accessToken = signJWT(
    { email: user.email, name: user.name, sessionId: session.sessionId },
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

  return res.send(session);
});


authRouter.get("/api/session", requireUser, async (req: Request, res: Response) => {
  // @ts-ignore
  return res.send(req.user);
});

authRouter.delete("/api/session", requireUser, async (req: Request, res: Response) => {
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