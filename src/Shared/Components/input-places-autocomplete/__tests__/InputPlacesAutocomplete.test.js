import React from 'react';
import renderer from 'react-test-renderer';
import InputPlacesAutocomplete from '../InputPlacesAutocomplete';
import { shallow } from 'enzyme';

describe('<InputPlacesAutocomplete /> component', () => {
  
  it('should match the snapshot', () => {
    const output = renderer.create(<InputPlacesAutocomplete />).toJSON();
    expect(output).toMatchSnapshot();
  })

  it('render HTML correctly', () => {
    const wrapper = shallow(<InputPlacesAutocomplete />);
    
    expect(wrapper.find('input').length).toBe(1);
  });
})