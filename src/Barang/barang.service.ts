import {db} from '../utils/db.server';

export type Barang = {
    id: string
    nama: string
    kode: string
    harga: number
    stok: number
    perusahaan_id: string
}

export const getBarang = async (q: string, idPerusahaan: string): Promise<Barang[]> => {
    return db.barang.findMany({
        where: {
            nama: {
                contains: q,
            },
            perusahaan_id: idPerusahaan,
        }
    });
};

export const getBarangById = async (id: string): Promise<Barang | null> => {
    return db.barang.findUnique({
        where: {
            id,
        },
    });
}

export const createBarang = async (barang: Barang): Promise<Barang> => {
    return db.barang.create({
        data: barang,
    });
}

export const updateBarang = async (id: string, barang: Barang): Promise<Barang | null> => {
    return db.barang.update({
        where: {
            id: id,
        },
        data: {
            id: barang.id,
            nama: barang.nama,
            kode: barang.kode,
            harga: barang.harga,
            stok: barang.stok,
            perusahaan_id: barang.perusahaan_id,
        }
    });
}

export const deleteBarang = async (id: string): Promise<Barang | null> => {
    return db.barang.delete({
        where: {
            id,
        },
    });
}
