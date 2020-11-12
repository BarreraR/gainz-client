import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ApiContext from '../ApiContext';

export default function ExerciseMain(){
  const { routines=[] } = useContext(ApiContext);
  const { routine } = useParams();
  const history = useHistory();

  function handleClick(ex){
    console.log(ex.name);
    history.push(`/add-exercise-data/${ex.id}`);
  }

  function displayExercises(){
    return routines.length > 0 
      ? routines[routine-1].exercises.map(ex => <p key={ex.id} onClick={()=> handleClick(ex)}>{ex.name}</p>)
      : '';
  }

  return (      
    <div>
      <h2>Routine: {routines.length > 0? routines[parseInt(routine)-1].name :''}</h2>
      <div>
        <h3>Your Exercicses!</h3>
        (click on an exercise to enter data)
        {displayExercises()}
      </div>
    </div>
  );

}