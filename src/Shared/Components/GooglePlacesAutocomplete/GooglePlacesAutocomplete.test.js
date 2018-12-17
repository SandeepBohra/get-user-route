import React from 'react';
import renderer from 'react-test-renderer';
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';
import { shallow } from 'enzyme';

describe('<GooglePlacesAutocomplete /> component', () => {
  
  it('should match the snapshot', () => {
    const output = renderer.create(<GooglePlacesAutocomplete />).toJSON();
    expect(output).toMatchSnapshot();
  })

  it('render HTML correctly', () => {
    const wrapper = shallow(<GooglePlacesAutocomplete />);
    
    expect(wrapper.find('input').length).toBe(1);
  });
})