import React from 'react';
import renderer from 'react-test-renderer';
import Loader from './Loader';

describe('<Loader /> component', () => {
  
  it('should match the snapshot', () => {
    const output = renderer.create(<Loader />).toJSON();
    expect(output).toMatchSnapshot();
  })
})