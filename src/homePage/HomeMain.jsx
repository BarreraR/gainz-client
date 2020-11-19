import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ApiContext from '../ApiContext';
import ProgressComponent from '../Components/ProgressComponent';
import './HomeMain.css';

export default function ExerciseMain(){
  const history = useHistory();
  const { user, exercise_records = [], routines = [] } = useContext(ApiContext);

  // use effect will fix refresh error/ use useEffect to get updated data from server
  const routinesList = routines
    .filter(routine => routine.owner === user.id)
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
      {console.log(user) /* This is temporary, user will be created 100% in login */}
      <h2>Profile: {user !== undefined ? user.name: ''}</h2>

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