import React from 'react';
import { shallow } from 'enzyme';
import Event from './Event';

describe('Event component', () => {
  it('should show the event name', () => {
    const wrapper = shallow(<Event onRegister={() => {
    }}
      event={{ name: 'Event1', restaurant: { name: 'Rest1' } }} />);
    expect(wrapper.find('h4').text()).toBe('Event Event1');
  });
  it('should call onRegister on button click', () => {
    const onRegisterClick = jest.fn();
    const wrapper = shallow(<Event onRegister={onRegisterClick}
      event={{ name: 'Event1', restaurant: { name: 'Rest1' } }} />);
    wrapper.find('.card-header.pointer-event').simulate('click');
    wrapper.find('button').simulate('click');
    expect(onRegisterClick).toHaveBeenCalled();
  });
});
