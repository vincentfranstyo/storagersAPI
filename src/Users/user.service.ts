import {db} from '../utils/db.server';

export type User = {
    id: string
    username: string
    password: string
};

// TODO fix this
export const listUsers = async (): Promise<User[]> => {
    return db.user.findMany();
};

export const getUser = async (username: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            username,
        },
    });
}

export const createUser = async (user: User): Promise<User> => {
    return db.user.create({
        data: user,
    });
}

export const updateUser = async (username: string, user: User): Promise<User | null> => {
    return db.user.update({
        where: {
            username,
        },
        data: user,
    });
}

export const deleteUser = async (username: string): Promise<User | null> => {
    return db.user.delete({
        where: {
            username,
        },
    });
}

