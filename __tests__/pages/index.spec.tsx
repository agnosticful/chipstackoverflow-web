import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import Home from '../../pages/index';

describe('Home test', () => {
  it('tests home page render correctly', () => {
    const renderer = TestRenderer.create(<Home />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
