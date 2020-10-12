import React from 'react';
import { shallow, mount } from 'enzyme';
import NewEvent from './NewEvent';

describe('NewEvent component', () => {
  it('should show Add a new event title', () => {
    const wrapper = shallow(<NewEvent />);
    expect(wrapper.find('h4').text()).toBe('Create an event');
  });
  it('should call onAdd on button click', () => {
    const onAddClick = jest.fn();
    const wrapper = mount(<NewEvent onAdd={onAddClick} />);
    wrapper.find('.btn-primary').simulate('click');
    expect(onAddClick).toHaveBeenCalled();
  });
});
