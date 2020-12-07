import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import ApiContext from "./ApiContext";
import LandingMain from "./landingPage/LandingMain";
import LandingNav from "./landingNav/LandingNav";
import HomeMain from "./homePage/HomeMain";
import RoutineMain from "./routinePage/RoutineMain";
import ExerciseMain from "./exercisePage/ExerciseMain";
import CreateRoutineMain from "./createRoutinePage/CreateRoutineMain";
import MainNav from "./mainNav/MainNav";
import LoginMain from "./loginMain/LoginMain";
import RegisterMain from "./registerMain/RegisterMain";
import PageNotFound from "./pageNotFound/PageNotFound";
import config from "./config";
import TokenService from "./services/token-service";
import PrivateRoute from "./Components/PrivateRoute";
import decode from "jwt-decode";
import "./App.css";

class App extends Component {
  state = {
    user: {},
    exercise_records: [],
    routines: [],
    exercises: [],
  };

  updateUser(user) {
    this.setState({ user, exercise_records: [], routines: [], exercises: [] });
  }

  fetchData() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/exercises`),
      fetch(`${config.API_ENDPOINT}/routines`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      fetch(`${config.API_ENDPOINT}/records`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([exercisesRes, routinesRes, recordsRes]) => {
        if (!exercisesRes.ok)
          return exercisesRes.json().then((e) => Promise.reject(e));
        if (!routinesRes.ok)
          return routinesRes.json().then((e) => Promise.reject(e));
        if (!recordsRes.ok)
          return recordsRes.json().then((e) => Promise.reject(e));

        return Promise.all([
          exercisesRes.json(),
          routinesRes.json(),
          recordsRes.json(),
        ]);
      })
      .then(([exercises, routines, exercise_records]) => {
        const token = TokenService.getAuthToken();
        const decodedToken = decode(token);

        const user = {
          first_name: decodedToken.first_name,
          last_name: decodedToken.last_name,
        };

        this.setState({ user, exercises, routines, exercise_records });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) this.fetchData();
  }

  addRoutine = (newRoutine) => {
    this.setState({ routines: [...this.state.routines, newRoutine] });
  };

  addRecord = (newRecord) => {
    this.setState({
      exercise_records: [...this.state.exercise_records, newRecord],
    });
  };

  renderNavRoutes() {
    return (
      <div>
        <Switch>
          {["/", "/login", "/signup"].map((path) => (
            <Route exact key={path} path={path} component={LandingNav} />
          ))}

          {[
            "/home",
            "/routine/:routine",
            "/add-exercise-data",
            "/add-routine",
            "/add-exercise-data/:exercise",
          ].map((path) => (
            <Route exact key={path} path={path}>
              <MainNav updateUser={(user) => this.updateUser(user)} />
            </Route>
          ))}
        </Switch>
      </div>
    );
  }

  renderMainRoutes() {
    return (
      <div>
        <Switch>
          <Route exact path="/"> 
            <LandingMain loginUser={() => this.fetchData()}/>
          </Route >
          <Route exact path="/login">
            <LoginMain loginUser={() => this.fetchData()} />
          </Route>
          <Route exact path="/signup" component={RegisterMain} />

          <PrivateRoute exact path={"/home"} component={HomeMain} />
          <PrivateRoute
            exact
            path="/routine/:routine"
            component={RoutineMain}
          />
          <PrivateRoute
            exact
            path="/add-exercise-data"
            component={ExerciseMain}
          />
          <PrivateRoute
            exact
            path="/add-exercise-data/:exercise"
            component={ExerciseMain}
          />
          <PrivateRoute
            exact
            path="/add-routine"
            component={CreateRoutineMain}
          />
          <PrivateRoute component={PageNotFound} />
        </Switch>
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
      addRecord: this.addRecord,
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <header className="App_header">
            <Link to={TokenService.hasAuthToken() ? "/home" : "/"}>
              <h1>Gainz</h1>
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
