import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.css';

export default function MainNav(){
  return (
    <ul className='Main_Nav'>
      <NavLink to='/home' className='Main_Nav_Button'>
        Home
      </NavLink>
      <NavLink to='/add-routine' className='Main_Nav_Button'>
        Add Routine
      </NavLink>
      <NavLink to='/add-exercise-data' className='Main_Nav_Button'>
        Add Exercise
      </NavLink>
    </ul>
  );
}