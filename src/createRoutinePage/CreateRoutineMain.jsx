import React, { useState, useContext, useEffect } from 'react';
import ApiContext from '../ApiContext';
import { useHistory } from 'react-router-dom';
import './CreateRoutineMain.css';
import config from '../config';

export default function CreateRoutineMain() {
  // TODO:
  // when reload, exerciseList gets emptied... why? 
  // when refresh, data added to context gets deleted
  const { exercises = [], routines, user, addRoutine } = useContext(ApiContext);

  const history = useHistory();
  
  const [ routine, setRoutine ] = useState([]);
  const [ eId, setEId ] = useState(0);
  const [ routineName, setRoutineName ] = useState('');
  const [ exerciseList, setExerciseList] = useState([]); // use effect with api 

  useEffect(() => {
    setExerciseList(exercises);
  }, [exercises]);

  function createExerciseList(exercises){
    return exercises
      .map(exercise => 
        <option 
          key={exercise.id} 
          value={exercise.id}>
            {exercise.exercise}
        </option>
      );
  }

  function nameSet(e){
    const name = e.target.value;
    if(name.length>0){
      setRoutineName(name);
    }
  }

  function exerciseSelected(e) {
    setEId(parseInt(e.target.value));
  }

  function removeExercise(exercise){
    setRoutine(routine.filter(ex => ex !== exercise));
    setExerciseList([ ...exerciseList, exercise]);
  }
  
  function validateAdd(){
    if(eId > 0){
      addExercise();
    }
  }

  function addExercise(){
    setRoutine([ ...routine, exerciseList.find(ex => ex.id === eId) ]);

    setExerciseList(exerciseList.filter(ex => ex.id !== eId));

    setEId(0);
  }

  function handleSubmit(e){
    e.preventDefault();

    if(routine.length>0 && routineName.length > 0){
      
      const routineObj = {
        // id: routines.length+1, // temporary, will be created by server
        owner: user.id, // will need to be changed when user creates
        name: routineName,
        exercises: routine 
      }

      console.log(JSON.stringify(routineObj));

      fetch(`${config.API_ENDPOINT}/routines`,{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(routineObj)
      })
      .then(res => {
        if(!res.ok) return res.json().then(e=>Promise.reject(e));
        return res.json();
      })
      .then(routine => {
        routineObj.id = routine.id;
        console.log(routineObj, routine[0].id);
        addRoutine(routineObj);

        history.push({
          pathname:`/home`
        });
      })
      .catch(error => {
        console.error({error});
      })
    }
  }

  return(
    <form className='Create_Routine_Main_Form' onSubmit={(e) =>handleSubmit(e)}>
      <h2>Create a routine!</h2>
      <label>Enter a name for the routine: </label>
      <br/>
      <input type='text' onChange={(e) => nameSet(e)}/>
      <br/>
      <label>Select an exercise to add to the routine: </label>
      <br/>
      <select onChange={(e)=> exerciseSelected(e)} value={eId}>
        <option value='0'>
          --Select an exercise--
        </option>
        {createExerciseList(exerciseList)}
      </select>
      <button type='button' onClick={() => validateAdd()}>Add</button>
      <br/>
      <div>
        {routine
          .map(ex=>
            <div className='Create_Routine_Main_Exercise' key={ex.id}><span>{ex.exercise}</span>  
              <button type='button' onClick={()=>removeExercise(ex)}>
                remove
              </button></div>
          )
        }
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}