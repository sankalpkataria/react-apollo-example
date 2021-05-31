import { ApolloClient } from '@apollo/client/core';
import { USER } from 'apollo/fragments';
import { User } from 'models/user';

export const writeUserToCache = (client: ApolloClient<unknown>, user: User): void => {
    const id = `${user['__typename']}:${user.id}`;
    client.writeFragment({
        id,
        fragment: USER,
        data: user,
    });
};
