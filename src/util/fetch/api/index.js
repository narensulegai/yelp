import {
  get, post, destroy, put,
} from '..';

export const currentUser = () => get('currentUser');
export const getImages = () => get('images');
export const addImages = (img) => post('images', img);
export const deleteImage = (id) => destroy(`image/${id}`);
export const updateRestaurantProfile = (d) => put('profile/restaurant', d);
export const getRestaurantProfile = () => get('profile/restaurant');
export const getDishes = () => get('dishes');
export const createDish = (d) => post('dish', d);
export const updateDish = (id, d) => put(`dish/${id}`, d);
export const deleteDish = (id) => destroy(`dish/${id}`);
