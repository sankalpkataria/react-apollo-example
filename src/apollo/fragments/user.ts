import { gql } from 'graphql.macro';

export const USER = gql`
    fragment userFields on User {
        name
        email
        id
        age
    }
`;
