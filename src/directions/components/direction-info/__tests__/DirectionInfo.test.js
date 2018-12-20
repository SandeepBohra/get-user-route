import React from 'react';
import renderer from 'react-test-renderer';
import DirectionInfo from '../DirectionInfo';
import { shallow } from 'enzyme';

describe('<DirectionInfo /> component', () => {
  
  it('should match the snapshot', () => {
    const output = renderer.create(<DirectionInfo />).toJSON();
    expect(output).toMatchSnapshot();
  })

  it('Should render coorectly', () => {
      const container = shallow(< DirectionInfo />);
      
      expect(container.find('div').length).toBe(3);
  })
})