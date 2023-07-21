import type {Request, Response} from "express";
import express from "express";
import {body} from "express-validator";
import jwt from "jsonwebtoken";

import * as LoginService from "./login.service";
import {User} from "./login.service";

export const loginRouter = express.Router();

// GET: Login
loginRouter.get("/", async (req: Request, res: Response) => {
    let apiResp = {};
    try {
        const login = await LoginService.getLogin(req.body.username, req.body.password);
        apiResp = {
            status: "success",
            message: "Login retrieved successfully",
            data: login,
        };
    } catch (err: any) {
        res.status(500).json({message: err.message});
        apiResp = {
            status: "error",
            message: "failed to retrieve login",
            data: null,
        };
    }
    res.send(apiResp);
});

// POST: Create new login
loginRouter.post("/", [
    body("username").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("password").isString().notEmpty(),
], async (req: Request, res: Response) => {
    const currentData = await LoginService.getLogin(req.body.username, req.body.password);

    if (currentData){
        const token = jwt.sign(currentData.username, 'secret-Key');
        const data : User = {
            id: currentData.id,
            username: currentData.username,
            password: currentData.password
        }

        const loginData = {
            user:data,
            token: token
        }
        const apiResp = {
            status: "success",
            message: "Login done successfully",
            data: loginData,
        }

        res.cookie('token', token, {httpOnly: true});
        res.send(apiResp);
    } else {
        res.status(500).json({message: "Login failed"});
    }
});