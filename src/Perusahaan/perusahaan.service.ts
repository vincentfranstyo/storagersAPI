import { db } from '../utils/db.server';

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
            kode: {
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
    return db.perusahaan.create({
        data: perusahaan,
    });
}

export const updatePerusahaan = async (id: string, perusahaan: Perusahaan): Promise<Perusahaan | null> => {
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