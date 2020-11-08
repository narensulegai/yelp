import React from 'react';
import { shallow } from 'enzyme';
import Event from './Event';

describe('Event component', () => {
  it('should show the event name', () => {
    const wrapper = shallow(<Event onDelete={() => {}}
      event={{ name: 'Event1', restaurant: { name: 'Rest1' }, Registration: [] }} />);
    expect(wrapper.find('.card-header').text()).toBe('Event1');
  });
  it('should call onDelete on button click', () => {
    const onDeleteClick = jest.fn();
    const wrapper = shallow(<Event onDelete={onDeleteClick}
      event={{ name: 'Event1', restaurant: { name: 'Rest1' }, Registration: [] }} />);
    wrapper.find('button').simulate('click');
    expect(onDeleteClick).toHaveBeenCalled();
  });
});
