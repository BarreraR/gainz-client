import React, { useContext } from 'react';
import ApiContext from '../ApiContext';
import moment from 'moment';
import './ProgressComponent.css';

export default function ProgressComponent() {
  const { exercise_records } = useContext(ApiContext);

  function getSetVal(arr, set){
    return arr[arr.findIndex(s => s.set === set)];
  }

  const progress = exercise_records.map(r => {
    const { recordId, date, exercise, sets, weights, reps } = r;
    const setData = [];

    for (let i = 1; i <= sets; i++) {
      setData.push(
        <span key={`${recordId}${i}`}>
          Set {i} Reps: {getSetVal(reps, i).reps} - Set {i} Weight: {getSetVal(weights, i).weights}
          <br />
        </span>
      );
    }

    return (
      <div className='Exercise_Record' tabIndex='0' key={`${recordId}`}>
        <strong>{moment(date).format('LLLL')}</strong>
        <p>
          Exercise: {exercise.exercise}
          <br />
          Sets: {sets}
          <br />
          {setData}
        </p>
      </div>
    );
  });

  return <div className='Exercise_Record_List'>{progress}</div>;
}
