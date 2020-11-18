import React from 'react';
import { useHistory } from 'react-router-dom';

export default function LoginMain() {
  const history = useHistory();
  
  function handleClick(){
    history.push(
      {
        pathname: 'home'
      }
    )
  }
  
  return (
    <div>
      <button onClick={()=>handleClick()}>
        Enter
      </button>
    </div>
  );
}