import React from 'react';
import ReactDOM from 'react-dom';
import HomeMain from './HomeMain';

it('renders HomeMain without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomeMain/>, div);
  ReactDOM.unmountComponentAtNode(div);
});