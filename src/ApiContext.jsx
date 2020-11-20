import React from 'react';

export default React.createContext({
  user: {},   
  exercise_records: [], 
  routines: [],
  exercises: [],
  addRoutine: () => {},
  addRecord: ()=>{},
});