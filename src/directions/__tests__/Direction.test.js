import React from 'react';
import renderer from 'react-test-renderer';
import Direction from '../Direction';

describe('<Direction /> component', () => {
  
  it('should match the snapshot', () => {
    const output = renderer.create(<Direction />).toJSON();
    expect(output).toMatchSnapshot();
  })
})