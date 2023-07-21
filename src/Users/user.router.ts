import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as UserService from './user.service';

export const userRouter = express.Router();

// GET: List of Users
userRouter.get('/', async (req: Request, res: Response) => {
    try{
        const users = await UserService.listUsers()
        return res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// GET: User by username
userRouter.get('/:username', async (req: Request, res: Response) => {
    try{
        const user = await UserService.getUser(req.params.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create new user
userRouter.post('/', [
    body('username').isString().notEmpty(),
], async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        const user = await UserService.createUser(req.body);
        return res.status(201).json(user);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// PUT: Update user by username
userRouter.put('/:username', [
    body('username').isString().notEmpty(),
], async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        const user = await UserService.updateUser(req.params.username, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE: Delete user by username
userRouter.delete('/:username', async (req: Request, res: Response) => {
    try{
        const user = await UserService.deleteUser(req.params.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});