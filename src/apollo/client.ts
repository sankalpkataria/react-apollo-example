import { ApolloClient, ApolloLink, split, NormalizedCacheObject } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { HttpLink } from '@apollo/client/link/http';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { CONSTANTS } from 'config/constants';
import { cache } from './cache';

const { API_URI, WS_URI, TOKEN_KEY } = CONSTANTS;

const http = new HttpLink({ uri: API_URI });
const middleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: `Bearer ${localStorage.getItem(TOKEN_KEY) || null}`,
            'client-name': 'react-apollo-example',
            'client-version': '1.0.0',
        },
    });
    return forward(operation);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ws: any = new WebSocketLink({
    uri: WS_URI as string,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: `Bearer ${localStorage.getItem(TOKEN_KEY) || null}`,
        },
    },
});

ws.subscriptionClient.on('connected', () => {
    console.log('Connected');
});

ws.subscriptionClient.on('reconnected', () => {
    console.log('Reconnected');
});

ws.subscriptionClient.on('disconnected', () => {
    console.log('disconnected');
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}
            Location: ${JSON.stringify(locations)}
            Path: ${path}`,
            ),
        );

    if (networkError) {
        console.log(`[Network error]: ${JSON.stringify(networkError)}`);
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const mainDefinition = getMainDefinition(query);
        return mainDefinition.kind === 'OperationDefinition' && mainDefinition.operation === 'subscription';
    },
    ws,
    http,
);

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
    link: middleware.concat(errorLink).concat(link),
    cache,
    // We can add client side graphql type definitions here using typeDefs property
});
