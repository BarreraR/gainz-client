import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import config from "../config";
import TokenService from "../services/token-service";
import "./LoginMain.css";
import decode from 'jwt-decode';

export default function LoginMain(props) {
  const history = useHistory();
  const [errorMessage, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    setError(null);

    const { username, password } = e.target;
    console.log(username.value, password.value);

    const user = { username: username.value, password: password.value };

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
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        console.log('before decoded')
        const decodedToken = decode(res.authToken);
      
        const user = {
          first_name: decodedToken.first_name,
          last_name: decodedToken.last_name,          
        }
        props.updateUser(user);
        console.log(decodedToken, ' decoded token');
        history.push(
          {
            pathname: 'home'
          }
        );
      })
      .catch((res) => {
        console.log("catch ", res);
        username.value = "";
        password.value = "";
        setError(res.error);
      });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="Login_Form">
        <h2>Welcome</h2>
        <p>Please login to continue</p>

        <div role='alert'>
          {errorMessage && <p className='red'>{errorMessage}</p>}
        </div>

        <label htmlFor="username">Username </label>
        <input id="username" type="text" placeholder="user123" />
        <br />
        <label htmlFor="password">Password </label>
        <input id="password" type="password" placeholder="password" />
        <br />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
