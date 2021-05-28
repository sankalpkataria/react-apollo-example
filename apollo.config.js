module.exports = {
    client: {
        service: {
            name: 'react-apollo-example',
            url: 'http://localhost:8080/graphql',
            includes: ['./src/**/*.graphql.ts'], // TODO: change this to .graphql
        },
    },
};
