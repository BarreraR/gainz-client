import React from 'react';
import { NavLink } from 'react-router-dom';
import TokenService from '../services/token-service';
import './MainNav.css';

export default function MainNav(props){
  function signOut(){
    TokenService.clearAuthToken();
    props.updateUser({});
  }

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
      <NavLink exact to='/' className='Main_Nav_Button' onClick={()=>signOut()}>
        Sign out
      </NavLink>
    </ul>
  );
}