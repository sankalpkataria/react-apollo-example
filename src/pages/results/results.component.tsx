import { useApolloClient } from '@apollo/client/react';
import { readUserFromCache } from 'apollo/cache/user';
import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// This component gets user data from apollo cache(our central state)
export const ResultComponent: FC = () => {
    const apolloClient = useApolloClient();
    const params: { id: string } = useParams();
    const user = readUserFromCache(apolloClient, params.id);
    if (!user) {
        return (
            <p>
                Nothing&apos;s here. Please add a user <Link to="/">here</Link>
            </p>
        );
    }
    return (
        <Fragment>
            <p>ID: {user.id}</p>
            <p>NAME: {user.name}</p>
            <p>EMAIL: {user.email}</p>
            <p>AGE: {user.age}</p>
        </Fragment>
    );
};
