import React from 'react';
import {useHistory } from 'react-router-dom';
import './RegisterMain.css';

export default function RegisterMain() {
  const history = useHistory();

  function handleSubmit(e){
    e.preventDefault();
    history.push(
      {
        pathname: 'home'
      }
    )
  }
  
  return (
    <div>
      <form onSubmit={e => handleSubmit(e)} className='Register_Form'>
        <h2>Welcome</h2>
        <p>Please register to continue</p>
        <label htmlFor='username'>Username </label>
        <br/>
        <input id='username' type='text' placeholder='user123'/>
        <br/>
        <label htmlFor='password'>Password </label>
        <br/>
        <input id='password' type='password' placeholder='password'/>
        <br/>
        <label htmlFor='password'>Confirm Password </label>
        <br/>
        <input id='password' type='password' placeholder='password'/>
        <br/>
        <label htmlFor='first_name'>First Name </label>
        <br/>
        <input id='first_name' type='text' placeholder='Bob'/>
        <br/>
        <label htmlFor='last_name'>Last Name </label>
        <br/>
        <input id='last_name' type='text' placeholder='Ross'/>
        <br/>
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
}