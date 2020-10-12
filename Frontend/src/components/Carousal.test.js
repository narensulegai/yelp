import React from 'react';
import { shallow } from 'enzyme';
import Carousal from './Carousal';

describe('Carousal component', () => {
  it('should show name of the person commenting', () => {
    const wrapper = shallow(<Carousal images={[{ fileId: '1' }, { fileId: '2' }, { fileId: '3' }]} />);
    expect(wrapper.find('.d-block img').length).toBe(3);
  });
});
