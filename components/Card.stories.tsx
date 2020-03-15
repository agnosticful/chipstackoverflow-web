import * as React from 'react';
import Card from './Card';

export default {
  title: 'Card',
  component: Card
};

export const card = () => <Card hoverable style={{ width: '500px', height: '150px' }} />;
