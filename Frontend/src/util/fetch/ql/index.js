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
