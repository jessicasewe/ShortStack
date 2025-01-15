import express from "express";
import { createUser, getUsers, getUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/signup", createUser as any);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser as any);

export default userRouter;
