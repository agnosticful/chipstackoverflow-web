import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Home from '../../pages/index';

describe('Home test', () => {
  it('tests home page render correctly', () => {
    const home = renderer.create(<Home />).toJSON();

    expect(home).toMatchSnapshot();
  });
});
