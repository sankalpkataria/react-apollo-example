import { ApolloClient } from '@apollo/client/core';
import { USER } from 'apollo/fragments';
import { User } from 'models/user';

export const writeUserToCache = (client: ApolloClient<unknown>, user: User): void => {
    const id = `User:${user.id}`;
    client.writeFragment({
        id,
        fragment: USER,
        data: user,
    });
};

export const readUserFromCache = (client: ApolloClient<unknown>, userId: string): User | null => {
    const id = `User:${userId}`;
    return client.readFragment({
        id,
        fragment: USER,
    });
};
