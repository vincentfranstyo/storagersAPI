import {db} from '../src/utils/db.server';
import {randomUUID} from "crypto";

type User = {
    username: string;
    password: string;
}
type Perusahaan = {
    id: string;
    nama: string;
    kode: string;
    alamat: string;
    no_telp: string;
}

type Barang = {
    id: string;
    nama: string;
    kode: string;
    harga: number;
    stok: number;
    perusahaan_id: string;
}

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
            perusahaan_id: perusahaanData[0].id,
        },
        {
            id: randomUUID(),
            nama: "Barang B",
            kode: "B",
            harga: 2000,
            stok: 20,
            perusahaan_id: perusahaanData[1].id,
        }
    ]
}

const perusahaanData = getPerusahaan();

async function seedPerusahaan() {
    await Promise.all(
        perusahaanData.map((perusahaan) => {
            return db.perusahaan.create({
                data: {
                    ...perusahaan,
                }
            });
        }),
    );
}

async function seedBarang() {
    await Promise.all(
        getBarang().map((barang) => {
            return db.barang.create({
                data: {
                    ...barang,
                }
            });
        }),
    );
}

async function seedUser() {
    await Promise.all(
        getUser().map((user) => {
            return db.user.create({
                data: {
                    ...user,
                }
            });
        }),
    );
}

async function seed() {
    await seedUser();
    await seedPerusahaan();
    await seedBarang();
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
