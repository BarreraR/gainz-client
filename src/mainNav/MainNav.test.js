import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainNav from './MainNav';

it('renders MainNav without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MainNav/>
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});