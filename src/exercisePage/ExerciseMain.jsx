import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ApiContext from '../ApiContext';
import './ExerciseMain.css'

export default function ExerciseMain() {
  const [inputs, setInputs] = useState([]); 
  const history = useHistory();
  const { exercise } = useParams();
  const { exercises = [], user, exercise_records } = useContext(ApiContext);

  const exerciseList = exercises.map(ex => 
    <option 
      key={ex.id} 
      value={ex.id}>
        {ex.exercise}
    </option>);

  function handleSubmit(e){
    e.preventDefault();

    const exData = new FormData(e.target);
    const obj = {
      'id': exercise_records.length+1,
      'user_id': user.id,
      'reps': [],
      'weights': [],
    };

    for( let [key, value] of exData.entries()){

      if(key === 'exercise') {
        if(value==='0'){
        console.log('missing data'); 
        return; // needs to call function to render that data is missing 
        }else{
          obj[key] = parseInt(value);
        }
      }
      
      if(key === 'sets'){
        if(value.length === 0){
          console.log('missing data'); 
          return; // needs to call function to render that data is missing 
        } else {
          obj[key] = parseInt(value);
        }
      }

      if(key.includes('reps')){
        if(value.length === 0){
          console.log('missing data'); 
          return; // needs to call function to render that data is missing 
        } else {
          obj.reps.push(parseInt(value));
        }
      }

      if(key.includes('weight')){
        if(value.length === 0){
          console.log('missing data'); 
          return; // needs to call function to render that data is missing 
        } else {
          obj.weights.push(parseInt(value));
        }
      }
    }

    // add record object into server
    if(exercise !== undefined) obj.exercise = exercises[parseInt(exercise) -1].name;
    exercise_records.push(obj);
    
    console.log(exercise_records);
    
    history.push({
      pathname:`/home`
    });
  }

  function handleSets(e){
    let temp = [];
    for(let i = 1; i <= e.target.value; i++){
      temp.push(
        <div className='Exercise_Main_Set' key={`set_${i}`}>
          <span>Set {i}</span>
          <label htmlFor={`set_${i}_reps`}>
            Reps:
          <input type='number' name={`set_${i}_reps`} min='1' placeholder='1'/>
          </label>

          <label htmlFor={`set_${i}_weight`}>
            Weight (lbs):
          <input type='number' name={`set_${i}_weight`} min='0' step='2.5' placeholder='0'/>
          </label>

        </div>
      );
    }
    setInputs(temp);
  };

  function handleClear() {
    setInputs([]);
  }

  function renderExercise(){
    return exercise === undefined
      ? ( 
        <> 
          <label>
            Exercise: 
          </label>
          <select name='exercise'>
            <option>
              --Select an exercise--
            </option>
            {exerciseList}
          </select> 
          <br/>
        </>
      )
      : ( 
        <h3>Exercise: {exercises.length>0? exercises[parseInt(exercise) -1].exercise:''}</h3>
      );
  }

  return (
    <div>
      <form className='Exercise_Main_Form' onSubmit={e => handleSubmit(e)}>
        {renderExercise()}
        <label htmlFor='sets'>
          Sets:
        </label>
        <input type='number' name='sets' onChange={(e)=>handleSets(e)} min='0' max='20' placeholder='0'/>
        <br/>
        {inputs}
        <button type='reset' onClick={() => handleClear()}>
          Clear
        </button>
        <button type='submit'>
          Submit  
        </button>
      </form>
    </div>
  );
}