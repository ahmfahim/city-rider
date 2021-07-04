import './App.css';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import Home from "./components/Home/Home";
import Destination from "./components/Destination/Destination";
import Login from "./components/Login/Login";
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path='/destination/:ID'>
              <Destination />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
