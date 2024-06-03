import { ApolloServer, gql } from 'apollo-server';
import { promises as fs } from 'fs';
import path from 'path';
import resolvers from './resolvers.js';

// Load schema from schema.graphql
const __dirname = path.resolve();
const typeDefs = gql(await fs.readFile(path.join(__dirname, 'schema.graphql'), 'utf8'));

// Create Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
