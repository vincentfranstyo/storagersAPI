import { PrismaClient } from '@prisma/client';

let db: PrismaClient

declare global {
    var __db: PrismaClient | undefined;
}

const getInstance = () => {
    if (!global.__db) {
        global.__db = new PrismaClient();
    }
    return global.__db;
}

db = getInstance();

export { db };