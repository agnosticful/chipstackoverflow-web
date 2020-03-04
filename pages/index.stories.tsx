import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Home from './index';

storiesOf('Home', module).add('home', () => {
  return <Home />;
});
