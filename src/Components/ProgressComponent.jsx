import React from 'react';
// import ApiContext from './ApiContext';

export default function ProgressComponent(props){
  const { date, sets, reps, weights, exercise, id } = props.data;
  
  const setData = [];
  
  for(let i = 1; i<= sets; i++){
    setData.push(
      <span key={`${id}${i}`}>
        Set {i} Reps: {reps[i-1]} - Set {i} Weight: {weights[i-1]} <br/>
      </span>
    );
  }

  return (
    <div>
      <strong>{date}</strong>
      <p>
        Exercise: {exercise}
        <br/>
        Sets: {sets}
        <br/>
        {setData}
      </p>
    </div>
  );
}