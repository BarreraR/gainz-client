import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RegisterMain.css';
import config from '../config';

export default function RegisterMain() {
  const history = useHistory();
  const [errorMessage, setError] = useState(null);
  const [confPass, setConfPass] = useState('');
  const [pass, setPass] = useState('');

  function confPassEntered(e){
    setConfPass(e.target.value);
  }

  function passwordEntered(e){
    setPass(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    
    if(pass !== confPass){
      return;
    }

    const { username, password, first_name, last_name } = e.target;
    const user = {
      username: username.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
    };
    console.log(user);
    setError(null);

    fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e=> Promise.reject(e))
          : res.json()
      )
      .then(() => 
        history.push(
          {
            pathname: 'login'
          }
        )
      )
      .catch(res => setError(res.error));
  }
  
  return (
    <div>
      <form onSubmit={e => handleSubmit(e)} className='Register_Form'>
        <div role='alert'>
          {errorMessage && <p className='red'>{errorMessage}</p>}
        </div>

        <h2>Welcome</h2>
        <p>Please register to continue <br/> All fields required</p>
        <label htmlFor='username'>Username </label>
        <br/>
        <input id='username' type='text' placeholder='User1'/>
        <br/>
        <label htmlFor='password'>Password </label>
        <br/>
        <input id='password' type='password' placeholder='Password@1' onChange={e=>passwordEntered(e)}/>
        <br/>
        <label htmlFor='conf_password'>Confirm Password </label>
        <br/>
        <input id='conf_password' type='password' placeholder='Password@1' onChange={e=>confPassEntered(e)}/>
        {!(confPass===pass) && <><br/><span>*Passwords do not match*</span></>}
        <br/>
        <label htmlFor='first_name'>First Name </label>
        <br/>
        <input id='first_name' type='text' placeholder='First'/>
        <br/>
        <label htmlFor='last_name'>Last Name </label>
        <br/>
        <input id='last_name' type='text' placeholder='Last'/>
        <br/>
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
}