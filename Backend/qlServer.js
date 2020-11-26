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
  input DishInput {
    description: String
    dishCategory: Int
    ingredients: String
    name: String
    price: String
  }
  input CustomerProfileInput {
    about: String
    thingsILove: String
    website: String
    yelpingSince: String
  }
  input RestaurantProfileInput {
    description: String
    contactInformation: String
    timings: String
  }
  input CommentInput {
    comment: String
    rating: Int
  }
  type CurrentUser {
    isLoggedIn: Boolean
    scope: String
  }
  type Customer {
    id: ID
    name: String
    email: String
    about: String
    thingsILove: String
    website: String
    yelpingSince: String
    orders: [Order]
  }
  type Dish {
    id: ID
    restaurant: ID
    customer: Customer
    description: String
    dishCategory: Int
    ingredients: String
    name: String
    price: String
    createdAt: String
  }
  type Order {
    id: ID
    customer: Customer
    status: String
    isPickup: Boolean
    createdAt: String
    dish: Dish
  }
  type Restaurant {
    id: ID
    email: String
    name: String
    location: String
    description: String
    contactInformation: String
    timings: String
    dishes: [Dish]
    orders: [Order]
  }
  type Comment {
    id: ID
    text: String
    rating: Int
    createdAt: String
    customer: Customer
    dish: Dish
  }
  type Query {
    currentUser: CurrentUser
    currentCustomer: Customer
    currentRestaurant: Restaurant
    getRestaurants(text: String): [Restaurant]
    getRestaurant(id: String): Restaurant
    myOrders: [Order]
    getComments(dishId: String): [Comment]
    getRestaurantComments: [Comment]
    getCustomer(id: String): Customer
  }
  type Mutation {
    loginCustomer(email: String, password: String): String
    loginRestaurant(email: String, password: String): String
    createCustomer(customer: CustomerInput): String 
    updateCustomerProfile(customerProfile: CustomerProfileInput): Boolean
    createRestaurant(restaurant: RestaurantInput): String
    updateRestaurantProfile(restaurantProfile: RestaurantProfileInput): Boolean 
    createDish(dish: DishInput): Boolean 
    updateDish(dishId: String, dish: DishInput): Boolean 
    placeOrder(dishId: String, isPickup: Boolean): Boolean 
    updateOrder(orderId: String, status: String): Boolean 
    addComment(dishId: String, text: String, rating: Int): Boolean 
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
    currentRestaurant: async (parent, variables, context) => {
      return modules.currentRestaurant(context.session.user.id);
    },
    getRestaurants: async (parent, { text }) => {
      return modules.getRestaurants(text);
    },
    getRestaurant: async (parent, { id }) => {
      return modules.getRestaurant(id);
    },
    myOrders: async (parent, variables, context) => {
      return modules.myOrders(context.session.user.id);
    },
    getComments: async (parent, { dishId }) => {
      return modules.getComments(dishId);
    },
    getRestaurantComments: async (parent, variables, context) => {
      return modules.getRestaurantComments(context.session.user.id);
    },
    getCustomer: async (parent, { id }) => {
      return modules.getCustomer(id);
    },
  },
  Mutation: {
    loginCustomer: async (parent, { email, password }) => {
      return modules.loginCustomer(email, password);
    },
    loginRestaurant: async (parent, { email, password }) => {
      return modules.loginRestaurant(email, password);
    },
    createCustomer: async (parent, { customer }) => {
      return modules.createCustomer(customer);
    },
    updateCustomerProfile: async (parent, { customerProfile }, context) => {
      return modules.updateCustomerProfile(context.session.user.id, customerProfile);
    },
    createRestaurant: async (parent, { restaurant }) => {
      return modules.createRestaurant(restaurant);
    },
    updateRestaurantProfile: async (parent, { restaurantProfile }, context) => {
      return modules.updateRestaurantProfile(context.session.user.id, restaurantProfile);
    },
    createDish: async (parent, { dish }, context) => {
      return modules.createDish(context.session.user.id, dish);
    },
    updateDish: async (parent, { dishId, dish }, context) => {
      return modules.updateDish(context.session.user.id, dishId, dish);
    },
    placeOrder: async (parent, { dishId, isPickup }, context) => {
      return modules.placeOrder(context.session.user.id, dishId, isPickup);
    },
    updateOrder: async (parent, { orderId, status }, context) => {
      return modules.updateOrder(context.session.user.id, orderId, status);
    },
    addComment: async (parent, { dishId, text, rating }, context) => {
      return modules.addComment(context.session.user.id, dishId, text, rating);
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
