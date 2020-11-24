import React from 'react';
import { useHistory } from 'react-router-dom';
import './LoginMain.css';

export default function LoginMain() {
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
      <form onSubmit={e => handleSubmit(e)} className='Login_Form'>
        <h2>Welcome</h2>
        <p>Please login to continue</p>
        <label htmlFor='username'>Username </label>
        <input id='username' type='text' placeholder='user123'/>
        <br/>
        <label htmlFor='password'>Password </label>
        <input id='password' type='password' placeholder='password'/>
        <br/>
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
}