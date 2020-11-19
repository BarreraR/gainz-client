import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import "./RoutineMain.css";

export default function ExerciseMain() {
  const { routines = [] } = useContext(ApiContext);
  const { routine } = useParams();

  function getPos() {
    return routines.findIndex((r) => r.id === parseInt(routine));
  }

  function displayExercises() {
    return routines.length > 0
      ? routines[getPos()].exercises.map((ex) => (
          <Link
            className="Routine_Main_Exercise"
            key={ex.id}
            to={`/add-exercise-data/${ex.id}`}
          >
            {ex.name}
          </Link  >
        ))
      : "";
  }

  return (
    <div className="Routine_Main">
      <h2>Routine: {routines.length > 0 ? routines[getPos()].name : ""}</h2>
      <div>
        <h3>Your Exercicses!</h3>
        (click on an exercise to enter data)
        <ul className='Routine_Main_List'>
          {displayExercises()}
        </ul>   
      </div>
    </div>
  );
}
