import React, { Component } from 'react';
import STORE from './dummy-store';
import { Route, Link } from 'react-router-dom';
import ApiContext from './ApiContext'
import LandingMain from './landingPage/LandingMain';
import LandingNav from './landingNav/LandingNav';
import HomeMain from './homePage/HomeMain';
import RoutineMain from './routinePage/RoutineMain';
import ExerciseMain from './exercisePage/ExerciseMain';
import CreateRoutineMain from './createRoutinePage/CreateRoutineMain';
import MainNav from './mainNav/MainNav';
import LoginMain from './loginMain/LoginMain';
import RegisterMain from './registerMain/RegisterMain'; 
import config from './config';
import TokenService from './services/token-service';
import './App.css';

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
    // this.setState({
    //   user : STORE.users[1], 
    //   exercise_records: STORE.exercise_records, 
    //   routines: STORE.routines,
    //   exercises: STORE.exercises
    // });

    const temp = TokenService.getAuthToken();
    console.log(Buffer
      .from(temp, 'base64')
      .toString())
    
    console.log(temp)

    Promise.all([
      fetch(`${config.API_ENDPOINT}/exercises`),
      fetch(`${config.API_ENDPOINT}/routines`),
      fetch(`${config.API_ENDPOINT}/records`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
    ])
    .then(([exercisesRes, routinesRes, recordsRes]) => {
      if(!exercisesRes.ok)
        return exercisesRes.json().then(e=> Promise.reject(e));
      if(!routinesRes.ok)
        return routinesRes.json().then(e=> Promise.reject(e));
      if(!recordsRes.ok)
        return recordsRes.json().then(e=> Promise.reject(e));

      return Promise.all([exercisesRes.json(), routinesRes.json(), recordsRes.json()])
    })
    .then(([exercises, routines, exercise_records]) => {
      this.setState({user : STORE.users[0], exercises, routines, exercise_records});
    })
    .catch(error => {
      console.error({error});
    });
  }

  addRoutine = newRoutine => {
    this.setState({routines: [...this.state.routines, newRoutine]});
  }

  addRecord = newRecord => {
    this.setState({exercise_records: [...this.state.exercise_records, newRecord]});
  }

  renderNavRoutes(){
    return (
      <div>
        {['/', '/login', '/signup'].map(path => 
          <Route 
            exact
            key={path}
            path={path}
            component={LandingNav}
          /> 
        )}

        {['/home', '/routine', '/add-exercise-data', '/add-routine']
          .map(path =>
            <Route 
              key={path}
              path={path}
              component={MainNav}
            />
          )
        }

      </div>
    );
  }
  
  renderMainRoutes(){
    return (
      <div>
        <Route exact path='/' component={LandingMain}/>
        <Route exact path='/login' component={LoginMain}/>
        <Route exact path='/signup' component={RegisterMain}/>

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
      exercises: this.state.exercises,
      addRoutine: this.addRoutine,
      addRecord: this.addRecord
    };

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <header className="App_header">
            <Link to='/'>
              <h1>
                Gainz
              </h1>
            </Link>
          </header>
          <nav className="App_nav">{this.renderNavRoutes()}</nav>
          <main className="App_main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;