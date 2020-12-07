import React from 'react';
import ReactDOM from 'react-dom';
import RegisterMain from './RegisterMain';

it('renders RegisterMain without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterMain/>, div);
  ReactDOM.unmountComponentAtNode(div);
});