import {db} from '../src/utils/db.server';
import {randomUUID} from "crypto";

type User = {
    username: string;
    password: string;
}
type Barang = {
    id: string;
    nama: string;
    kode: string;
    harga: number;
    stok: number;
    perusahaan_id: string;
}
type BarangWithPerusahaan = Barang & {
    perusahaan: {
        nama: string;
    }
}
type Perusahaan = {
    id: string;
    nama: string;
    kode: string;
    alamat: string;
    no_telp: string;
}
type Response<T> = {
    status: "success" | "error";
    message: string;
    data: T | null;
}

async function seed() {
    await Promise.all(
        getUser().map((user) => {
            return db.user.create({
                data: {
                    ...user,
                }
            });
        }),
    );
    const user = await db.user.findFirst({
        where: {
            username: "admin",
        }
    });

    await Promise.all(
        getPerusahaan().map((perusahaan) => {
            return db.perusahaan.create({
                data: {
                    ...perusahaan,
                }
            });
        }),
    );
    const perusahaan = await db.perusahaan.findFirst({
        where: {
            id: getPerusahaan()[0].id,
        }
    });

    function getPerusahaanIdForBarang(barang: Barang) {
        try{
            const perusahaan = getPerusahaan().find((perusahaan) => {
                return perusahaan.id === barang.perusahaan_id;
            });
            if (!perusahaan) {
                throw new Error("Perusahaan not found");
            }
            return perusahaan.id;
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    }

    // TODO: fix Foreign key constraint failed on the field: `perusahaan_id`
    await Promise.all(
        getBarang().map((barang) => {
            return db.barang.create({
                data: {
                    ...barang,
                }
            });
        }),
    );
    const barang = await db.barang.findFirst({
        where: {
            id: getBarang()[0].id,
        }
    });

    await Promise.all(
        getBarangWithPerusahaan().map((barangWithPerusahaan) => {
                return db.barang.create({
                    data: {
                        ...barangWithPerusahaan,
                    }
                });
            }
        ),
    );

    const barangWithPerusahaan = await db.barang.findFirst({
        where: {
            id: getBarangWithPerusahaan()[0].id,
        }
    });
}

seed()
    .then(() => {
        console.log("Seeding success");
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1)
    });

function getUser(): Array<User> {
    const userData = [
        {
            username: "admin",
            password: "admin",
        }
    ];

    const uniqueUsernames = new Set(userData.map((user) => user.username));
    const fiteredUserData = userData.filter((user) => {
        if (uniqueUsernames.has(user.username)) {
            return false;
        }
        uniqueUsernames.add(user.username);
        return true;
    });

    return fiteredUserData.map((user) => {
        return {
            username: user.username,
            password: user.password,
        };
    });
}

function getPerusahaan(): Array<Perusahaan> {
    return [
        {
            id: randomUUID(),
            nama: "PT. A",
            kode: "A",
            alamat: "Jl. A",
            no_telp: "08536465487",
        },
        {
            id: randomUUID(),
            nama: "PT. B",
            kode: "B",
            alamat: "Jl. B",
            no_telp: "08123456789",
        }
    ];
}

function getBarang(): Array<Barang> {
    return [
        {
            id: randomUUID(),
            nama: "Barang A",
            kode: "A",
            harga: 1000,
            stok: 10,
            perusahaan_id: getPerusahaan()[0].id,
        },
        {
            id: randomUUID(),
            nama: "Barang B",
            kode: "B",
            harga: 2000,
            stok: 20,
            perusahaan_id: getPerusahaan()[1].id,
        }
    ]
}

function getBarangWithPerusahaan(): Array<BarangWithPerusahaan> {
    return [
        {
            id: randomUUID(),
            nama: "Barang A",
            kode: "A",
            harga: 1000,
            stok: 10,
            perusahaan_id: getBarang()[0].perusahaan_id,
            perusahaan: {
                nama: "PT. A",
            }
        },
        {
            id: randomUUID(),
            nama: "Barang B",
            kode: "B",
            harga: 2000,
            stok: 20,
            perusahaan_id: getBarang()[1].perusahaan_id,
            perusahaan: {
                nama: "PT. B",
            }
        }
    ]
}
