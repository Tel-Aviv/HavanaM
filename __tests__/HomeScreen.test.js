import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../src/screens/HomeScreen'

test('Scroll report entries', () => {
    const component = renderer.create(<HomeScreen />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});