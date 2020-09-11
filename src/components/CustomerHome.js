import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  addImages, deleteImage, getImages,
  updateCustomerProfile, getCustomerProfile,
} from '../util/fetch/api';
import CustomerProfile from './CustomerProfile';
import CustomerDashboard from './CustomerDashboard';
import Events from './customer/Events';

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [], profile: {}, currentTab: 'events',
    };
    this.handleOnProfileImageAdd = this.handleOnProfileImageAdd.bind(this);
    this.handleOnProfileImageDelete = this.handleOnProfileImageDelete.bind(this);
    this.handleOnProfileSave = this.handleOnProfileSave.bind(this);
  }

  async componentDidMount() {
    const images = await getImages();
    const profile = await getCustomerProfile();
    this.setState({ images, profile });
  }

  async handleOnProfileImageAdd(fileIds) {
    // Delete the current image first
    if (this.state.images.length) {
      await deleteImage(this.state.images[0].id);
    }
    await addImages({ fileIds: fileIds.files, type: 'profile', typeId: null });
    this.setState({ images: await getImages() });
  }

  async handleOnProfileImageDelete(id) {
    await deleteImage(id);
    this.setState({ images: await getImages() });
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
        <nav className="navbar clearfix">
          <Link to="/logout">Logout</Link>
        </nav>
        <div className="row">

          <div className="col-2">
            <button className={classNames({ 'font-weight-bold': currentTab === 'dashboard', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'dashboard' })}>
              Dashboard
            </button>
            <button className={classNames({ 'font-weight-bold': currentTab === 'profile', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'profile' })}>
              Profile
            </button>
            <button className={classNames({ 'font-weight-bold': currentTab === 'events', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'events' })}>
              Events
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

            {currentTab === 'events' && (
              <Events />
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default CustomerHome;
