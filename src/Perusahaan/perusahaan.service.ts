import {db} from '../utils/db.server';

export type Perusahaan = {
    id: string
    nama: string
    alamat: string
    no_telp: string
    kode: string
}

export const getPerusahaan = async (q: string): Promise<Perusahaan[]> => {
    return db.perusahaan.findMany({
        where: {
            nama: {
                contains: q,
            },
        }
    });
}

export const getPerusahaanById = async (id: string): Promise<Perusahaan | null> => {
    return db.perusahaan.findUnique({
        where: {
            id,
        },
    });
}

export const createPerusahaan = async (perusahaan: Perusahaan): Promise<Perusahaan> => {
    const validKode = () => {
        const kode = perusahaan.kode;
        if (kode.length === 3) {
            for (let i = kode.length; i < 3; i++) {
                if (kode[i] !== kode.toUpperCase()) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    try{
        if (!validKode()) {
            throw new Error("Kode perusahaan tidak valid");
        }
    } catch (e) {
        throw e;
    }
    return db.perusahaan.create({
        data: {
            nama: perusahaan.nama,
            alamat: perusahaan.alamat,
            no_telp: perusahaan.no_telp,
            kode: perusahaan.kode,
        }
    });
}

export const updatePerusahaan = async (id: string, perusahaan: Perusahaan): Promise<Perusahaan | null> => {
    const validKode = () => {
        const kode = perusahaan.kode;
        if (kode.length === 3) {
            return kode === kode.toUpperCase();
        } else {
            return false;
        }
    }
    try{
        if (!validKode()) {
            throw new Error("Kode perusahaan tidak valid");
        }
    } catch (e) {
        throw e;
    }
    return db.perusahaan.update({
        where: {
            id,
        },
        data: perusahaan,
    });
}

export const deletePerusahaan = async (id: string): Promise<Perusahaan | null> => {
    return db.perusahaan.delete({
        where: {
            id,
        },
    });
}