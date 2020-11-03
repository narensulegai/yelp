import {
  get, post, destroy, put, apiUrl,
} from '..';

export const currentUser = () => get('currentUser');
export const updateRestaurantProfile = (d) => put('profile/restaurant', d);
export const updateCustomerProfile = (d) => put('profile/customer', d);
export const getDishes = () => get('dishes');
export const getRestaurantComments = () => get('restaurant/comments');
export const getRestaurantDishes = (id) => get(`restaurant/dishes/${id}`);
export const placeOrder = (id, d) => post(`placeOrder/${id}`, d);
export const createDish = (d) => post('dish', d);
export const updateDish = (id, d) => put(`dish/${id}`, d);
export const deleteDish = (id) => destroy(`dish/${id}`);
export const logout = () => put('logout');
export const getRestaurantEvents = () => get('restaurant/events');
export const createEvent = (d) => post('event', d);
export const deleteEvent = (id) => destroy(`event/${id}`);
export const getEvents = (text) => get(`events?search=${text}`);
export const getCustomerEvents = (text) => get(`customer/events?search=${text}`);
export const registerEvent = (id) => post(`registerEvent/${id}`);
export const getRestaurants = (text = '') => get(`restaurants?search=${text}`);
export const getCustomer = (id) => get(`customer/${id}`);
export const addComment = (id, d) => post(`comment/${id}`, d);
export const getComments = (id) => get(`comments/${id}`);
export const myOrders = () => get('myOrders');
export const updateMyOrder = (id, d) => put(`myOrder/${id}`, d);
export const sendMessageTo = (text, userId) => post(`message/${userId}`, { text });
export const getMessagesFrom = (userId) => get(`messages/${userId}`);
export const getCustomers = (text) => get(`customers?search=${text}`);
export const getFollowing = (text) => get(`following?search=${text}`);
export const follow = (id) => put(`follow/${id}`);
export const fileUrl = (fileId) => {
  return `${apiUrl}/file/${fileId}`;
};
