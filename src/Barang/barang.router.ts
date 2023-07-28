import type {Request, Response} from 'express';
import express from 'express';
import {body} from 'express-validator';

import * as BarangService from './barang.service';
import {Barang} from './barang.service';

export const barangRouter = express.Router();

// GET: List of Barang
barangRouter.get('/', async (req: Request, res: Response) => {
    let apiResp = {};
    try {
        const barangs = await BarangService.getBarang(req.query.q as string, req.query.idPerusahaan as string);
        apiResp = {
            status: "success",
            message: `barangs retrieved successfully`,
            data: barangs,
        };
    } catch (err: any) {
        console.error(err)

        res.status(500).json({message: err.message});
        apiResp = {
            status: "error",
            message: "failed to retrieve barangs",
            data: null,
        }
    }
    res.send(apiResp);
});

// GET: Barang by id
barangRouter.get('/:id', async (req: Request, res: Response) => {
    let apiResp = {};
    try {
        const barang = await BarangService.getBarangById(req.params.id);
        if (!barang) {
            return res.status(404).json({message: 'Barang not found'});
        }
        apiResp = {
            status: "success",
            message: `${barang.nama} retrieved successfully`,
            data: barang,
        };
    } catch (err: any) {
        res.status(500).json({message: err.message});
        apiResp = {
            status: "error",
            message: "failed to retrieve Barang",
            data: null,
        }
    }
    res.send(apiResp);
});

barangRouter.post('/', [body("nama").isString().notEmpty(), body("kode").isString().notEmpty(), body("harga").isString().notEmpty(), body("stok").isString().notEmpty(), body("perusahaan_id").isString().notEmpty(),], async (req: Request, res: Response) => {
    let apiResp = {};
    try {
        const barang = await BarangService.createBarang(req.body as Barang);
        apiResp = {
            status: "success",
            message: `${barang.nama} created successfully`,
            data: barang,
        };
    } catch (err: any) {
        res.status(500).json({message: err.message});
        apiResp = {
            status: "error",
            message: "failed to create Barang",
            data: null,
        }
    }
    res.send(apiResp);
});

barangRouter.put('/:id', [body("nama").isString().notEmpty(), body("kode").isString().notEmpty(), body("harga").isString().notEmpty(), body("stok").isString().notEmpty(), body("perusahaan_id").isString().notEmpty(),], async (req: Request, res: Response) => {
    let apiResp = {};
    try {
        const barang = await BarangService.updateBarang(req.params.id, req.body as Barang);
        if (!barang) {
            return res.status(404).json({message: 'Barang not found'});
        }
        apiResp = {
            status: "success",
            message: `${barang.nama} updated successfully`,
            data: barang,
        };

        res.send(apiResp);
    } catch (err: any) {
        apiResp = {
            status: "error",
            message: "failed to update Barang",
            data: null,
        }
        res.status(500).json({message: apiResp});
    }
});


// DELETE: Delete Barang by id
barangRouter.delete('/:id', async (req: Request, res: Response) => {
    let apiResp = {};
    try {
        const barang = await BarangService.deleteBarang(req.params.id);
        if (!barang) {
            return res.status(404).json({message: 'Barang not found'});
        }
        apiResp = {
            status: "success",
            message: `${barang.nama} deleted successfully`,
            data: barang,
        };
    } catch (err: any) {
        res.status(500).json({message: err.message});
        apiResp = {
            status: "error",
            message: "failed to delete Barang",
            data: null,
        }
    }
    res.send(apiResp);
});
