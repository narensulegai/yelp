import React, { Component } from 'react';
import {
  addImages, deleteImage, getDishes, getImages,
  getRestaurantProfile, updateDish, updateRestaurantProfile,
} from '../../util/fetch/api';
import RestaurantProfile from './RestaurantProfile';
import Dish from '../Dish';

class RestaurantHome extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [], profile: {}, dishes: [] };
    this.handleOnProfileImageAdd = this.handleOnProfileImageAdd.bind(this);
    this.handleOnProfileImageDelete = this.handleOnProfileImageDelete.bind(this);
    this.handleOnProfileSave = this.handleOnProfileSave.bind(this);
    this.handleOnDishUpdate = this.handleOnDishUpdate.bind(this);
  }

  async componentDidMount() {
    const images = await getImages();
    const profile = await getRestaurantProfile();
    const dishes = await getDishes();
    this.setState({ images, profile, dishes });
  }

  async handleOnProfileImageAdd(fileIds) {
    await addImages({ fileIds: fileIds.files, type: 'profile', typeId: null });
    this.setState({ images: await getImages() });
  }

  async handleOnProfileImageDelete(id) {
    await deleteImage(id);
    this.setState({ images: await getImages() });
  }

  async handleOnProfileSave(p) {
    updateRestaurantProfile(p)
      .then(async () => {
        const profile = await getRestaurantProfile();
        this.setState({ profile });
      });
  }

  async handleOnDishUpdate(id, dish) {
    updateDish(id, dish)
      .then(() => {
        getDishes()
          .then((dishes) => {
            this.setState({ dishes: [...dishes] });
          });
      });
  }

  render() {
    const { images, profile, dishes } = this.state;
    return (
      <div>
         <RestaurantProfile
          images={images}
          profile={profile}
          onSave={this.handleOnProfileSave}
          onProfileImageAdd={this.handleOnProfileImageAdd}
          onProfileImageDelete={this.handleOnProfileImageDelete}
         />
        {
          dishes.map((dish) => {
            return (
              <div key={dish.id}>
                <Dish dish={dish} onChange={(d) => this.handleOnDishUpdate(dish.id, d)} />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default RestaurantHome;
