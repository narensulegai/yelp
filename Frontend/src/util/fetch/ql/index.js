import gqlPrettier from 'graphql-prettier';

const query = async (query, variables = {}) => {
  window.error(null);
  window.message(null);
  const resp = await fetch(process.env.REACT_APP_QL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const d = await resp.json();
  console.group('Query and Response');
  console.log(gqlPrettier(query));
  console.log('Variables');
  console.log(JSON.stringify(variables, null, 2));
  console.log('Response');
  console.log(JSON.stringify(d, null, 2));
  console.groupEnd('Query');
  if (d.errors) {
    const { message } = d.errors[0];
    window.error(message);
    throw message;
  }
  return d.data;
};

export const loginCustomer = async (email, password) => {
  const q = `
    mutation _ ($email: String, $password: String) {
      loginCustomer (email: $email, password: $password)
    }
  `;
  const { loginCustomer } = await query(q, { email, password });
  window.localStorage.setItem('token', loginCustomer);
  return loginCustomer;
};

export const loginRestaurant = async (email, password) => {
  const q = `
    mutation _ ($email: String, $password: String) {
      loginRestaurant (email: $email, password: $password)
    }
  `;
  const { loginRestaurant } = await query(q, { email, password });
  window.localStorage.setItem('token', loginRestaurant);
  return loginRestaurant;
};

export const qlCurrentUser = async () => {
  const q = `
    {
      currentUser {
        isLoggedIn
        scope
      }
    }
  `;
  const { currentUser } = await query(q);
  return currentUser;
};

export const signUpCustomer = async (cust) => {
  const q = `
    mutation _ ($customer: CustomerInput) {
      createCustomer (customer: $customer)
    }
  `;
  const { createCustomer } = await query(q, { customer: cust });
  window.localStorage.setItem('token', createCustomer);
  return createCustomer;
};

export const getCurrentCustomer = async () => {
  const q = `
    {
      currentCustomer {
        id
        name
        about
        email
        thingsILove
        website
        yelpingSince
        orders {
          id
          status
          isPickup
          dish {
            id
            restaurant
            description
            dishCategory
            ingredients
            name
            price
          }
          createdAt
        }
      }
    }
  `;
  const { currentCustomer } = await query(q);
  return currentCustomer;
};

export const updateCustomerProfile = async (customerProfile) => {
  const q = `
    mutation _ ($customerProfile: CustomerProfileInput) {
      updateCustomerProfile (customerProfile: $customerProfile)
    }
  `;
  const { updateCustomerProfile } = await query(q, { customerProfile });
  return updateCustomerProfile;
};

export const signUpRestaurant = async (rest) => {
  const q = `
    mutation _ ($restaurant: RestaurantInput) {
      createRestaurant (restaurant: $restaurant)
    }
  `;
  const { createRestaurant } = await query(q, { restaurant: rest });
  window.localStorage.setItem('token', createRestaurant);
  return createRestaurant;
};

export const getCurrentRestaurant = async () => {
  const q = `
    {
      currentRestaurant {
        id
        name
        timings
        contactInformation
        description
        email
        location
        dishes {
          id
          restaurant
          description
          dishCategory
          ingredients
          name
          price
        }
        orders {
          id
          customer {
            id
            name
            email
            about
            thingsILove
            website
            yelpingSince
          }
          status
          isPickup
          createdAt
          dish {
            id
            description
            dishCategory
            ingredients
            name
            price
          }
        }
      }
    }
  `;
  const { currentRestaurant } = await query(q);
  return currentRestaurant;
};

export const getRestaurantOrders = async () => {
  const q = `
    {
      currentRestaurant {
        orders {
          id
          customer {
            id
            name
            email
            about
            thingsILove
            website
            yelpingSince
          }
          status
          isPickup
          createdAt
          dish {
            id
            description
            dishCategory
            ingredients
            name
            price
          }
        }
      }
    }
  `;
  const { currentRestaurant } = await query(q);
  return currentRestaurant;
};

export const updateRestaurantProfile = async (restaurantProfile) => {
  const q = `
    mutation _ ($restaurantProfile: RestaurantProfileInput) {
      updateRestaurantProfile (restaurantProfile: $restaurantProfile)
    }
  `;
  const { updateRestaurantProfile } = await query(q, { restaurantProfile });
  return updateRestaurantProfile;
};

export const createDish = async (dish) => {
  const q = `
    mutation _ ($dish: DishInput) {
      createDish (dish: $dish)
    }
  `;
  const { createDish } = await query(q, { dish });
  return createDish;
};

export const updateDish = async (dishId, dish) => {
  const q = `
    mutation _ ($dishId: String, $dish: DishInput) {
      updateDish (dishId: $dishId, dish: $dish)
    }
  `;
  const { updateDish } = await query(q, { dishId, dish });
  return updateDish;
};

export const getRestaurants = async (text = '') => {
  const q = `
    query _ ($text: String) {
      getRestaurants (text: $text) {
        id
        name
        timings
        contactInformation
        description
        email
        location
        dishes {
          description
          dishCategory
          ingredients
          name
          price
        }
      }
    }
  `;
  const { getRestaurants } = await query(q, { text });
  return getRestaurants;
};

export const getRestaurant = async (id) => {
  const q = `
    query _ ($id: String) {
      getRestaurant (id: $id) {
        id
        name
        timings
        contactInformation
        description
        email
        location
        dishes {
          id
          description
          dishCategory
          ingredients
          name
          price
        }
      }
    }
  `;
  const { getRestaurant } = await query(q, { id });
  return getRestaurant;
};

export const getCustomer = async (id) => {
  const q = `
    query _ ($id: String) {
      getCustomer (id: $id) {
        id
        name
        email
        about
        thingsILove
        website
        yelpingSince
      }
    }
  `;
  const { getCustomer } = await query(q, { id });
  return getCustomer;
};

export const placeOrder = async (dishId, isPickup) => {
  const q = `
    mutation _ ($dishId: String, $isPickup: Boolean) {
      placeOrder (dishId: $dishId, isPickup: $isPickup)
    }
  `;
  const { placeOrder } = await query(q, { dishId, isPickup });
  return placeOrder;
};

export const updateOrder = async (orderId, status) => {
  const q = `
    mutation _ ($orderId: String, $status: String) {
      updateOrder (orderId: $orderId, status: $status)
    }
  `;
  const { updateOrder } = await query(q, { orderId, status });
  return updateOrder;
};

export const getComments = async (dishId) => {
  const q = `
    query _ ($dishId: String) {
      getComments (dishId: $dishId) {
        id
        text
        rating
        createdAt
        customer {
            id
            name
        }
      }
    }
  `;
  const { getComments } = await query(q, { dishId });
  return getComments;
};

export const addComment = async (dishId, text, rating) => {
  const q = `
    mutation _ ($dishId: String, $text: String, $rating: Int) {
      addComment (dishId: $dishId, text: $text, rating: $rating)
    }
  `;
  const { addComment } = await query(q, { dishId, text, rating });
  return addComment;
};

export const getRestaurantComments = async () => {
  const q = `
    {
      getRestaurantComments {
        id
        text
        rating
        createdAt
        dish {
          name
        }
        customer {
          name
        }
      }
    }
  `;
  const { getRestaurantComments } = await query(q);
  return getRestaurantComments;
};
