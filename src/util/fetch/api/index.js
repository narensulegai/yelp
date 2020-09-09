import { get, post, destroy } from '..';

export const currentUser = () => get('currentUser');
export const getImages = () => get('images');
export const addImages = (img) => post('images', img);
export const deleteImage = (id) => destroy(`image/${id}`);
