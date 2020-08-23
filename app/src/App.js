import React from 'react';
import {Route, Switch} from "react-router-dom"

import './App.css';
import 'semantic-ui-css/semantic.min.css'

// react 1 developer 
import UserLogin from "./components/user/UserLogin"
import UserRegister from "./components/user/UserRegister"
// react 1 developer 

import AdminLogin from "./components/admin/AdminLogin"
import AdminRegister from "./components/admin/AdminRegister"

import Hello from "./components/Hello"
import Home from "./components/Home"


const App = ()  =>{
  
  return (
    <div className="App">
      
      <Switch>
       {/* react 1 developer  */}
      <Route  path="/UserRegister">
        <UserRegister />
      </Route>

      <Route  path="/UserLogin">
        <UserLogin />
      </Route>
      {/* react 1 developer  */}
      
      <Route path="/AdminLogin">
        <AdminLogin />
      </Route>

      <Route path="/AdminRegister">
        <AdminRegister />
      </Route>

      
      <Route path="/Hello">
        <Hello />
      </Route>

      {/* hello needs to be a privateRoute */}

      <Route path ="/">
        <Home />
      </Route>

      </Switch>
    </div>
  );
}

export default App;
