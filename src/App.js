import React, { Component } from 'react';
import STORE from './dummy-store';
import { Route } from 'react-router-dom';
import ApiContext from './ApiContext'
import LandingMain from './landingPage/LandingMain';
import LandingNav from './landingNav/LandingNav';
import HomeMain from './homePage/HomeMain';
import ExerciseNav from './mainNav/MainNav';
import RoutineMain from './routinePage/RoutineMain';
import ExerciseMain from './exercisePage/ExerciseMain';
import CreateRoutineMain from './createRoutinePage/CreateRoutineMain';

class App extends Component {
  // does state contain users or just the individual user?
  // only one user, token contains user data
  // store token in local storage
  // state destroyed on refresh
  // on load, check if token exists and if valid
  state = {
    user: {},      // users / no users only one token
    exercise_records: [],   // should this be each exercise or the exercise data where the name is an enum? Use table instead of enum for future expansion
    routines: [],  // back day, push day, monday, etc
    exercises: [],
  }

  componentDidMount() {
    this.setState({
      user : STORE.users[1], 
      exercise_records: STORE.exercise_records, 
      routines: STORE.routines,
      exercises: STORE.exercises
    });
  }

  renderNavRoutes(){
    return (
      <div>
        {['/', '/login/:newUser'].map(path => 
          <Route 
            exact
            key={path}
            path={path}
            component={LandingNav}
          /> 
        )};

        <Route path='/home/:routine/:exercise' component={ExerciseNav}/>
      </div>
    );
  }
  
  renderMainRoutes(){
    return (
      <div>
        {/* {['/', '/login/:newUser'].map(path => 
          <Route 
            exact
            key={path}
            path={path}
            component={LandingMain}
          /> 
        )}; */}

        <Route exact path='/home' component={HomeMain}/>
        <Route exact path='/routine/:routine' component={RoutineMain}/>
        <Route exact path='/add-exercise-data' component={ExerciseMain}/>
        <Route exact path='/add-exercise-data/:exercise' component={ExerciseMain}/>
        <Route exact path='/add-routine' component={CreateRoutineMain}/>

      </div>
    );
  }

  render() {
    const value = {
      user: this.state.user,
      exercise_records: this.state.exercise_records,
      routines: this.state.routines,
      exercises: this.state.exercises
    };
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          {/* <nav className="App_nav">{this.renderNavRoutes()}</nav> */}
          <header className="App_header">
            <h1>
              Gainz
            </h1>
          </header>
          <main className="App_main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;