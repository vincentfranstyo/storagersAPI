import type { Request, Response } from 'express';
import express from 'express';
import {body} from 'express-validator';

import * as PerusahaanService from './perusahaan.service';
import {Perusahaan} from './perusahaan.service';
import jwt from "jsonwebtoken";

export const perusahaanRouter = express.Router();

// GET: List of Perusahaan
perusahaanRouter.get('/', async (req: Request, res: Response) => {
    let apiResp = {};
    try{
        const perusahaans = await PerusahaanService.getPerusahaan(req.query.q as string);
        apiResp = {
            status: "success",
            message: `perusahaans retrieved successfully`,
            data: perusahaans,
        };
    } catch (err: any) {
        res.status(500).json({ message: err.message });
        apiResp = {
            status: "error",
            message: "failed to retrieve perusahaans",
            data: null,
        }
    }
    res.send(apiResp);
});

// GET: Perusahaan by id
perusahaanRouter.get('/:id', async (req: Request, res: Response) => {
    let apiResp = {};
    // const header = req.headers.authorization as string;
    try{
        const perusahaan = await PerusahaanService.getPerusahaanById(req.params.id);
        if (!perusahaan) {
            return res.status(404).json({ message: 'Perusahaan not found' });
        }
        apiResp = {
            status: "success",
            message: `${perusahaan.nama} retrieved successfully`,
            data: perusahaan,
        };
    } catch (err: any) {
        res.status(500).json({ message: err.message });
        apiResp = {
            status: "error",
            message: "failed to retrieve perusahaan",
            data: null,
        }
    }
    res.send(apiResp);
});

// POST: Create new perusahaan
perusahaanRouter.post('/', [body("nama").isString().notEmpty(), body("kode").isString().notEmpty(), body("alamat").isString().notEmpty(), body("no_telp").isString().notEmpty(),], async (req: Request, res: Response) => {
    let apiResp = {};
    const header = req.headers.authorization as string;
    try{
        const currentUser = jwt.verify(header, 'secret-Key') as string;
        if (currentUser !== "admin") {
            return res.status(401). json({ message: 'Unauthorized' });
        }
        const perusahaan = await PerusahaanService.createPerusahaan(req.body as Perusahaan);
        apiResp = {
            status: "success",
            message: "perusahaan created successfully",
            data: perusahaan,
        };
    } catch (err: any) {
        res.status(500).json({ message: err.message });
        apiResp = {
            status: "error",
            message: "failed to create perusahaan",
            data: null,
        }
    }
    res.send(apiResp);
});

// PUT: Update existing perusahaan
perusahaanRouter.put('/:id', [body("nama").isString().notEmpty(), body("kode").isString().notEmpty(), body("alamat").isString().notEmpty(), body("no_telp").isString().notEmpty(), body("perusahaan_id").isString().notEmpty()], async (req: Request, res: Response) => {
    let apiResp = {};
    const header = req.headers.authorization as string;
    try{
        // console.log("header", header)
        const currentUser = jwt.verify(header, 'secret-Key') as string;
        if (currentUser !== "admin") {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const perusahaan = await PerusahaanService.updatePerusahaan(req.params.id, req.body as Perusahaan);
        if (!perusahaan) {
            return res.status(404).json({ message: 'Perusahaan not found' });
        }
        apiResp = {
            status: "success",
            message: `${perusahaan.nama} updated successfully`,
            data: perusahaan,
        };
    } catch (err: any) {
        res.status(500).json({ message: err.message });
        apiResp = {
            status: "error",
            message: "failed to update perusahaan",
            data: null,
        }
    }
    res.send(apiResp);
});

// DELETE: Delete existing perusahaan
perusahaanRouter.delete('/:id', async (req: Request, res: Response) => {
    let apiResp = {};
    const header = req.headers.authorization as string;
    try{
        const currentUser = await jwt.verify(header, 'secret-Key') as string;
        if (currentUser !== "admin") {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const perusahaan = await PerusahaanService.deletePerusahaan(req.params.id);
        if (!perusahaan) {
            return res.status(404).json({ message: 'Perusahaan not found' });
        }
        apiResp = {
            status: "success",
            message: `${perusahaan.nama} deleted successfully`,
            data: perusahaan,
        };
    } catch (err: any) {
        res.status(500).json({ message: err.message });
        apiResp = {
            status: "error",
            message: "failed to delete perusahaan",
            data: null,
        }
    }
    res.send(apiResp);
});