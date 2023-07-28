import type {Request, Response} from 'express';
import express from 'express';
import jwt from "jsonwebtoken";
import {User} from "../Login/login.service";

export const selfRouter = express.Router();

// GET: Self
selfRouter.get('/', async (req: Request, res: Response) => {
    const header = req.headers.authorization as string;

    try {
        const currentUser = jwt.verify(header, 'secret-Key') as User;
        if (currentUser.username === "admin") {
            const apiResp = {
                status: "success",
                message: "Self retrieved successfully",
                data: currentUser,
            }
            res.send(apiResp);
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
        const apiResp = {
            status: "error",
            message: "failed to retrieve self",
            data: null,
        }
        res.send(apiResp);
    }
});