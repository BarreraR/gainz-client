import React from 'react';
import ReactDOM from 'react-dom';
import CreateRoutineMain from './CreateRoutineMain';

it('renders CreateRoutineMain without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateRoutineMain/>, div);
  ReactDOM.unmountComponentAtNode(div);
});