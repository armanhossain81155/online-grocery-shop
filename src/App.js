import './App.css';
import Header from './Component/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Component/Home/Home';
import Login from './Component/Login/Login';


import { createContext } from 'react';
import { useState } from 'react';
import Destination from './Component/Destination/Destination';


export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <div className="App">
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/home">
          <Home></Home>
          </Route>
          <Route exact path="/">
          <Home></Home>
          </Route>
         <Route path="/login">
            <Login></Login>
          </Route>
         <Route path="/destination">
           <Destination></Destination>
         </Route>
          
        </Switch>
      </Router>
      
      
    </div>
    </UserContext.Provider>
  );
}

export default App;
