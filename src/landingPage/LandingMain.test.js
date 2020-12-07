import React from 'react';
import ReactDOM from 'react-dom';
import LandingMain from './LandingMain';

it('renders LandingMain without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LandingMain/>, div);
  ReactDOM.unmountComponentAtNode(div);
});