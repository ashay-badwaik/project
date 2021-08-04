const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./graphql/resolvers');
const typeDefs = require("./graphql/schema.js");


const server = new ApolloServer({
    typeDefs, 
    resolvers,
    // mocks: true,
});

server.listen(4000).then(({url}) => {
    console.log(`server ready at ${url}`);
});