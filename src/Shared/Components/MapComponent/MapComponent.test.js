import React from 'react';
import renderer from 'react-test-renderer';
import MapComponent from './MapComponent';

describe('<MapComponent /> component', () => {
  
  it('should match the snapshot', () => {
    const output = renderer.create(<MapComponent />).toJSON();
    expect(output).toMatchSnapshot();
  })
})