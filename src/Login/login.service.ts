import { db } from '../utils/db.server';

export type User = {
    id: string
    username: string
    password: string
}

export const getLogin = async (username: string, password: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            username: username,
            password: password,
        },
    });
}