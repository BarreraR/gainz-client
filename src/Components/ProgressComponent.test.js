import React from 'react';
import ReactDOM from 'react-dom';
import ProgressComponent from './ProgressComponent';

it('renders ProgressComponent without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProgressComponent/>, div);
  ReactDOM.unmountComponentAtNode(div);
});