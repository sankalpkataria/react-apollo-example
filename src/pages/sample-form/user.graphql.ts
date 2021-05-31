import { gql } from 'graphql.macro';

export const addUserMutation = gql`
    mutation addUser($name: String!, $email: String!, $age: Float) {
        addUser(name: $name, email: $email, age: $age) {
            name
            email
            age
            id
        }
    }
`;
