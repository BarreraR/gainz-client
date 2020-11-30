import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ApiContext from '../ApiContext';
import ProgressComponent from '../Components/ProgressComponent';
import './HomeMain.css';

export default function ExerciseMain(){
  const history = useHistory();
  const { user, routines} = useContext(ApiContext);

  const routinesList = routines
    .map(routine =>
      <option key={routine.id} value={routine.id}> 
        {routine.name}
      </option>); 
  
  function routineSelected(e){
    history.push({
      pathname:`/routine/${e.target.value}`
    });
  };

  // const progress = exercise_records
  //   .map(record => 
  //     <ProgressComponent 
  //       key={record.recordId} 
  //       id={record.recordId}
  //     />
  //   );
    
  return (      
    <div className='Home_Main'>
      <h2>Profile: {`${user.first_name} ${user.last_name}`}</h2>

      <div>
        <h3>Your Routines!</h3>
        <p>Select from one of your saved routines!</p>
        <select  onChange={(e)=>routineSelected(e)}>
          <option>--Routines--</option>
          {routinesList}
        </select>
      </div>

      <div>
        <h3>Your progress</h3>
        <ProgressComponent/>  
      </div>

    </div>
  );
}