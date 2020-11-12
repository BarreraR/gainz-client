import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ApiContext from '../ApiContext';
import ProgressComponent from '../Components/ProgressComponent';

export default function ExerciseMain(){
  const history = useHistory();
  const { user, exercise_records = [], routines = [] } = useContext(ApiContext);
  const routinesList = routines
    .filter(routine => routine.user_id === user.id)
    .map(routine =>
      <option key={routine.id} value={routine.id}> 
        {routine.name}
      </option>); 
  
  function routineSelected(e){
    history.push({
      pathname:`/routine/${e.target.value}`
    });
  };

  const progress = exercise_records
    .map(record => 
      <ProgressComponent key={record.id} data={record}/>
    );
  
  
return (      
    <div>
      {console.log(user) /* This is temporary, user will be created 100% in login */}
      <h2>Profile: {user !== undefined ? user.name: ''}</h2>
      <div>
        <h3>Your progress</h3>
        {progress}  
      </div>
      <div>
        <h3>Your Routines!</h3>
        <p>Select from one of your saved routines!</p>
        <select  onChange={(e)=>routineSelected(e)}>
          <option>--Routines--</option>
          {routinesList}
        </select>
      </div>
      <div>
        <h3>New Entry!</h3>
        <p>Would you like to create a new routine or enter data for a single exercise?</p>
        
        <Link to='/add-routine'>
          <button>Add Routine</button>
        </Link>

        <Link to='/add-exercise-data'>
          <button>Add Exercise Data</button>
        </Link>
      </div>
    </div>
  );
}