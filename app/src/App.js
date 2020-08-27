import React from 'react';
import {Route, Switch} from "react-router-dom"


import './App.css';
import 'semantic-ui-css/semantic.min.css'

// react 1 developer 
import UserLogin from "./components/user/UserLogin"
import UserRegister from "./components/user/UserRegister"
import Header from './components/user/Header'

// react 1 developer 

import AdminLogin from "./components/admin/AdminLogin"
import AdminRegister from "./components/admin/AdminRegister"

import List from "./components/List"
import Home from "./components/Home"
import Todos from "./components/Todos"

import PrivateRouteLogin from "./components/privateRoutes/PrivateRouteLogin"




const App = ()  => {

  
  return (
    
    <div className="App">
      
      <Switch>
       {/* react 1 developer  */}
      <Route  path="/UserRegister">
        <Header />
        <UserRegister />
      </Route>

      <Route  path="/UserLogin">
        <Header />
        <UserLogin />
      </Route>
      {/* react 1 developer  */}
      
      <Route path="/AdminLogin">
        <AdminLogin />
      </Route>

      <Route path="/AdminRegister">
        <AdminRegister />
      </Route>

      <Route path="/list/Todos/:id" >
        <Todos />
      </Route>

      
      <PrivateRouteLogin path="/list" component={List} />
       

      <Route path ="/">
        <Home />
      </Route>

      </Switch>
    </div>
  );
}

export default App;
