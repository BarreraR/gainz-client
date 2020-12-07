import React from 'react';
import ReactDOM from 'react-dom';
import LoginMain from './LoginMain';

it('renders LoginMain without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginMain/>, div);
  ReactDOM.unmountComponentAtNode(div);
});