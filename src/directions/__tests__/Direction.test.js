import React from 'react';
import renderer from 'react-test-renderer';
import Direction from '../Direction';
import { shallow } from 'enzyme';
import Loader from '../../shared/components/loader/Loader'

describe('<Direction /> component', () => {
  
  it('should match the snapshot', () => {
    const output = renderer.create(<Direction />).toJSON();
    expect(output).toMatchSnapshot();
  });

  it('Should enable and disable <loader />', () => {
    const wrapper = shallow(<Direction />);
    wrapper.setState({
      isLoading: true
    });

    expect(wrapper.find(Loader).length).toBe(1);

    wrapper.setState({
      isLoading: false
    });

    expect(wrapper.find(Loader).length).toBe(0);
  });
})