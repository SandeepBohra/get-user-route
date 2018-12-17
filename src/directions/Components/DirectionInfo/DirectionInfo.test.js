import React from 'react';
import renderer from 'react-test-renderer';
import { DirectionInfo } from './DirectionInfo';

describe('<DirectionInfo /> component', () => {
  
  it('should match the snapshot', () => {
    const output = renderer.create(<DirectionInfo />).toJSON();
    expect(output).toMatchSnapshot();
  })
})