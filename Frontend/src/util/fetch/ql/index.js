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
        }
        events {
          id
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
