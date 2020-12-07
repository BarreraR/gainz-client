import React from 'react';
import ReactDOM from 'react-dom';
import PageNotFound from './PageNotFound';

it('renders PageNotFound without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PageNotFound/>, div);
  ReactDOM.unmountComponentAtNode(div);
});