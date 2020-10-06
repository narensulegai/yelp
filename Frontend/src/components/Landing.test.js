import React from 'react';
import { shallow } from 'enzyme';
import { Landing } from './Landing';

describe('Landing page', () => {
  it('should show Yelp! in the nav bar', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find('.h3.text-center').text()).toBe('Yelp!');
  });
  it('should toggle button text to "No, login as customer" on click', () => {
    const wrapper = shallow(<Landing />);
    wrapper.find('.btn-outline-primary').simulate('click');
    expect(wrapper.find('.btn-outline-primary').text()).toBe('No, login as customer');
  });
});
