import React from 'react';
import { shallow } from 'enzyme';
import Review from './Review';

describe('Review component', () => {
  it('should show name of the person commenting', () => {
    const wrapper = shallow(<Review comment={{
      customer: {
        id: 1, name: 'test', rating: 5, createdAt: '2020-10-10 16:03:55',
      },
    }} />);
    expect(wrapper.find('.card-body div a').text()).toBe('test');
  });
});
