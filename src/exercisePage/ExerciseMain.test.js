import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ExerciseMain from './ExerciseMain';

it('renders ExerciseMain without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ExerciseMain/>
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});