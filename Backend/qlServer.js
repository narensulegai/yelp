require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const modules = require('./modules');

// The GraphQL schema
const typeDefs = gql`
  input CustomerInput {
    name: String
    email: String
    password: String
  }
  type CurrentUser {
    isLoggedIn: Boolean
    scope: String
  }
  type Customer {
    id: ID
    name: String
    about: String
    email: String
    thingsILove: String
    website: String
    yelpingSince: String
  }
  type Query {
    "A simple type for getting started!"
    hello: String
    currentUser: CurrentUser
    currentCustomer: Customer
  }
  type Mutation {
    createCustomer(customer: CustomerInput): String 
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    currentUser: () => {
      return { isLoggedIn: false, scope: null };
    },
    currentCustomer: async (parent, variables, context) => {
      return modules.currentCustomer(context.session.user.id);
    },
  },
  Mutation: {
    createCustomer: async (parent, { customer }) => {
      return modules.createCustomer(customer);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { session: modules.getSession(req.headers.authorization || '') };
  },
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
