import {db} from '../utils/db.server';

export type Barang = {
    id: string
    nama: string
    kode: string
    harga: number
    stok: number
    perusahaan_id: string
}

export const getBarang = async (q: string, perusahaan: string): Promise<Barang[]> => {
    if (q !== undefined) {
        return db.barang.findMany({
            where: {
                OR: [
                    {
                        nama: {
                            contains: q
                        }
                    },
                    {
                        kode: {
                            contains: q
                        }
                    }
                ]
            }
        });
    } else if (perusahaan !== undefined) {
        return db.barang.findMany({
            where: {
                perusahaan_id: {
                    contains: perusahaan
                }
            }
        });
    } else if (perusahaan !== undefined && q !== undefined) {
        return db.barang.findMany({
            where: {
                AND: [
                    {
                        perusahaan_id: {
                            contains: perusahaan
                        }
                    },
                    {
                        OR: [
                            {
                                nama: {
                                    contains: q
                                }
                            },
                            {
                                kode: {
                                    contains: q
                                }
                            }
                        ]
                    }
                ]
            }
        });
    } else {
        return db.barang.findMany();
    }
};

export const getBarangById = async (id: string): Promise<Barang | null> => {
    return db.barang.findUnique({
        where: {
            id,
        },
    });
}

export const createBarang = async (barang: Barang): Promise<Barang> => {
    // validate kode barang to be unique
    const barangWithSameCode = await db.barang.findFirst({
        where: {
            kode: barang.kode.toUpperCase(),
        }
    });
    try{
        if(barangWithSameCode !== null){
            throw new Error("Kode barang sudah digunakan");
        }
        if (barang.harga === 0){
            throw new Error("Harga barang tidak boleh 0");
        }
    } catch (e) {
        console.error(e);
    }

    return db.barang.create({
        data: {
            id: barang.id,
            nama: barang.nama,
            kode: barang.kode.toUpperCase(),
            harga: barang.harga,
            stok: barang.stok,
            perusahaan_id: barang.perusahaan_id,
        }
    });
}

export const updateBarang = async (id: string, barang: Barang, kodeCurrentBarang: string): Promise<Barang | null> => {
    const barangWithSameCode = await db.barang.findFirst({
        where: {
            kode: barang.kode.toUpperCase(),
        }
    });
    try{
        if(barangWithSameCode !== null && barangWithSameCode.kode !== kodeCurrentBarang){
            throw new Error("Kode barang sudah digunakan");
        }
        if (barang.harga === 0){
            throw new Error("Harga barang tidak boleh 0");
        }
    } catch (e) {
        console.error(e);
        throw e;
    }

    return db.barang.update({
        where: {
            id: id,
        },
        data: {
            id: barang.id,
            nama: barang.nama,
            kode: barang.kode.toUpperCase(),
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
