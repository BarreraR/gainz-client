import React from 'react';
import { useHistory } from 'react-router-dom';
import config from '../config';
import TokenService from '../services/token-service';
import './LandingMain.css';

export default function LandingMain(props) {
  const history = useHistory();

  function demoClicked(){
    const user = { username: 'User1', password: 'Password@1' };

    fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if(!res.ok) 
          return res.json().then((e) => Promise.reject(e)); 
        else 
          return res.json();
      })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        props.loginUser();
        history.push(
          {
            pathname: 'home'
          }
        );
      })
  }

  return (
    <div className='Landing_Main'>
      <h1>Welcome to Gainz</h1>
      <p>With this app, you will be able to track the progress of your major lifts. You can also create routines for easy access to enter each exercise information. Information stored includes exercise name, number of sets, reps for each set, and the weight used.</p>
      <hr/>
      <p>User registration and login required.</p>
      <hr/>
      <p className='Landing_Main_Dummy_User' tabIndex='0' onClick={()=>demoClicked()} onKeyPress={()=>demoClicked()}>
        To test the application, use the following login user information or click here:
        <br/>
        Username: User1
        <br/>
        Password: Password@1
        </p>
    </div>
  );
}