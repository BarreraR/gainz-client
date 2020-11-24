import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingNav.css'

export default function MainNav(){
  return (
    <div className='Landing_Nav'>
      <NavLink to='/login' className='Landing_Nav_Button'>
        login
      </NavLink>
      <NavLink to='/signup' className='Landing_Nav_Button'>
        register  
      </NavLink>
    </div>
  );
}