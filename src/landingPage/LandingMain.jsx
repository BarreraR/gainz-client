import React from 'react';
import './LandingMain.css';

export default function LandingMain() {
  return (
    <div className='Landing_Main'>
      <h1>Welcome to Gainz</h1>
      <p>With this app, you will be able to track the progress of your major lifts. You can also create routines for easy access to enter each exercise information. Information stored includes exercise name, number of sets, reps for each set, and the weight used.</p>
      <hr/>
      <p>User registration and login required.</p>
      <hr/>
      <p className='Landing_Main_Dummy_User'>To test application, use the following login user information:
        <br/>
        Username: User1
        <br/>
        Password: Password@1
        </p>
    </div>
  );
}