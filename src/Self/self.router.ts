import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as SelfService from './self.service';

export const selfRouter = express.Router();

// GET: Self
selfRouter.get('/', async (req: Request, res: Response) => {
    let apiResp = {};
    try{
        const self = await SelfService.getSelf()
        apiResp = {
            status: "success",
            message: "Self retrieved successfully",
            data: self,
        };
    } catch (err: any) {
        res.status(500).json({ message: err.message });
        apiResp = {
            status: "error",
            message: "failed to retrieve self",
            data: null,
        }
    }
    res.send(apiResp);
});