import type {Request, Response} from 'express';
import express from 'express';
import jwt from "jsonwebtoken";
import {User} from "@prisma/client";
import * as SelfService from "./self.service";

export const selfRouter = express.Router();

// GET: Self
selfRouter.get('/', async (req: Request, res: Response) => {
    let header = req.headers.authorization as string;

    try {
        let currentUser = jwt.verify(header, 'secret-Key') as string;
        console.log(currentUser); // debug
        if (currentUser === "admin") {
            const apiResp = {
                status: "success",
                message: "Self retrieved successfully",
                data: currentUser,
            }
            console.log(apiResp); // buat debug
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