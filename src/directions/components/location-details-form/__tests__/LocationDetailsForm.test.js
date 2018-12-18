import React from 'react';
import renderer from 'react-test-renderer';
import LocationDetailsForm from '../LocationDetailsForm';

describe('<LocationDetailsForm /> component', () => {
  
  it('should match the snapshot', () => {
    const output = renderer.create(<LocationDetailsForm />).toJSON();
    expect(output).toMatchSnapshot();
  })
})