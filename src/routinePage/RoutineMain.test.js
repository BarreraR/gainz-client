import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RoutineMain from './RoutineMain';

it('renders RoutineMain without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <RoutineMain/>
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});