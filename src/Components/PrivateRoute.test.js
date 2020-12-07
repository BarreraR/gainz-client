import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import HomeMain from '../homePage/HomeMain';

it('renders PrivateRoute without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PrivateRoute
        exact
        path="/add-exercise-data/:exercise"
        component={HomeMain}
      />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});