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
  if (d.errors) {
    const { message } = d.errors[0];
    window.error(message);
    throw message;
  }
  return d.data;
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
          customer
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

export const updateRestaurantProfile = async (restaurantProfile) => {
  const q = `
    mutation _ ($restaurantProfile: RestaurantProfileInput) {
      updateRestaurantProfile (restaurantProfile: $restaurantProfile)
    }
  `;
  const { updateRestaurantProfile } = await query(q, { restaurantProfile });
  return updateRestaurantProfile;
};

export const getDishes = async () => {
  const q = `
    {
      getDishes {
        id
        restaurant
        name
        description
        dishCategory
        ingredients
        price
      }
    }
  `;
  const { getDishes } = await query(q);
  return getDishes;
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
