import React, { Component } from 'react';
import classNames from 'classnames';
import {
  addImages, deleteImage, getImages,
  updateCustomerProfile, getCustomerProfile,
} from '../../util/fetch/api';
import CustomerProfile from './CustomerProfile';
import CustomerDashboard from './CustomerDashboard';

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [], profile: {}, currentTab: 'profile',
    };
    this.handleOnProfileImageAdd = this.handleOnProfileImageAdd.bind(this);
    this.handleOnProfileImageDelete = this.handleOnProfileImageDelete.bind(this);
    this.handleOnProfileSave = this.handleOnProfileSave.bind(this);
  }

  async componentDidMount() {
    const images = await getImages();
    const profile = await getCustomerProfile();
    this.setState({ images: images.slice(-1), profile });
  }

  async handleOnProfileImageAdd(fileIds) {
    await addImages({ fileIds: fileIds.files, type: 'profile', typeId: null });
    const images = await getImages();
    this.setState({ images: images.slice(-1) });
  }

  async handleOnProfileImageDelete(id) {
    await deleteImage(id);
    const images = await getImages();
    this.setState({ images: images.slice(-1) });
  }

  async handleOnProfileSave(p) {
    updateCustomerProfile(p)
      .then(async () => {
        const profile = await getCustomerProfile();
        this.setState({ profile });
      });
  }

  render() {
    const {
      images, profile, currentTab,
    } = this.state;
    return (
      <div className="container-fluid">

        <div className="row mt-5">

          <div className="col-2">
            <button className={classNames({ 'font-weight-bold': currentTab === 'dashboard', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'dashboard' })}>
              Dashboard
            </button>
            <button className={classNames({ 'font-weight-bold': currentTab === 'profile', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'profile' })}>
              Profile
            </button>
          </div>

          <div className="col-10">

            {currentTab === 'profile' && (
              <CustomerProfile
                images={images.filter((i) => i.type === 'profile')}
                profile={profile}
                onSave={this.handleOnProfileSave}
                onProfileImageAdd={this.handleOnProfileImageAdd}
                onProfileImageDelete={this.handleOnProfileImageDelete}
              />
            )}

            {currentTab === 'dashboard' && (
              <CustomerDashboard />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerHome;
