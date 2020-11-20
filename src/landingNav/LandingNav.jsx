import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MainNav(){
  return (
    <div>
      <NavLink to='/login'>
        <button>login</button>
      </NavLink>
      <NavLink to='/signup'>
        <button>register</button>
      </NavLink>
    </div>
  );
}