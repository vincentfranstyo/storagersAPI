import { db } from '../utils/db.server';

export type User = {
    id: string
    username: string
    password: string
}

export const getSelf = async (): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            username: "admin",
        }
    });
}