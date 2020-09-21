import {
  get, post, destroy, put,
} from '..';

export const currentUser = () => get('currentUser');
export const getImages = () => get('images');
export const addImages = (img) => post('images', img);
export const deleteImage = (id) => destroy(`image/${id}`);
export const updateRestaurantProfile = (d) => put('profile/restaurant', d);
export const getRestaurantProfile = () => get('profile/restaurant');
export const updateCustomerProfile = (d) => put('profile/customer', d);
export const getCustomerProfile = () => get('profile/customer');
export const getDishes = () => get('dishes');
export const getRestaurantDishes = (id) => get(`restaurant/dishes/${id}`);
export const placeOrder = (id) => post(`placeOrder/${id}`);
export const createDish = (d) => post('dish', d);
export const updateDish = (id, d) => put(`dish/${id}`, d);
export const deleteDish = (id) => destroy(`dish/${id}`);
export const logout = () => put('logout');
export const getRestaurantEvents = () => get('restaurant/events');
export const createEvent = (d) => post('event', d);
export const deleteEvent = (id) => destroy(`event/${id}`);
export const getEvents = () => get('events');
export const getCustomerEvents = () => get('customer/events');
export const registerEvent = (id) => post(`registerEvent/${id}`);
export const getRestaurants = () => get('restaurants');
export const getCustomer = (id) => get(`customer/${id}`);
export const addComment = (id, d) => post(`comment/${id}`, d);
export const getComments = (id) => get(`comments/${id}`);
export const myOrders = () => get('myOrders');
export const updateMyOrder = (id, d) => put(`myOrder/${id}`, d);
