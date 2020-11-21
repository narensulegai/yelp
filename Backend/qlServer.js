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
  input RestaurantInput {
    name: String
    email: String
    password: String
    location: String  
  }
  input CustomerProfileInput {
    about: String
    thingsILove: String
    website: String
    yelpingSince: String
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
    currentUser: CurrentUser
    currentCustomer: Customer
  }
  type Mutation {
    createCustomer(customer: CustomerInput): String 
    updateCustomerProfile(customerProfile: CustomerProfileInput): Boolean
    createRestaurant(restaurant: RestaurantInput): String 
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    currentUser: (parent, variables, context) => {
      const isLoggedIn = !!context.session;
      const scope = context.session ? context.session.scope : null;
      return { isLoggedIn, scope };
    },
    currentCustomer: async (parent, variables, context) => {
      return modules.currentCustomer(context.session.user.id);
    },
  },
  Mutation: {
    createCustomer: async (parent, { customer }) => {
      return modules.createCustomer(customer);
    },
    updateCustomerProfile: async (parent, { customerProfile }, context) => {
      return modules.updateCustomerProfile(context.session.user.id, customerProfile);
    },
    createRestaurant: async (parent, { restaurant }) => {
      return modules.createRestaurant(restaurant);
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
