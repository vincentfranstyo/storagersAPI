import { db } from '../utils/db.server';

export type User = {
    id: string
    username: string
    password: string
}

export const getLogin = async (username: string, password: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            username,
            password,
        }
    });
}

export const createLogin = (username: string, password: string): Promise<User> => {
    return db.user.create({
        data: {
            username,
            password,
        }
    });
}