import React, { useState } from 'react';
import {Route, Switch} from "react-router-dom"
import * as yup from 'yup'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

// react 1 developer 
import UserLogin from "./components/user/UserLogin"
import UserRegister from "./components/user/UserRegister"
import formSchema from './components/user/Validation/formSchema'
// react 1 developer 

import AdminLogin from "./components/admin/AdminLogin"
import AdminRegister from "./components/admin/AdminRegister"

import Hello from "./components/Hello"
import Home from "./components/Home"

const initialLoginFormValues = {
  username: '',
  password: ''
}
// maybe only need one initial form?
const initialRegisterFormValues = {
  newUsername: '',
  email: '',
  newPassword: '',
  confirmPassword: '',
  location: '',

}

const regFormErrors = {
  newUsername: '',
  email: '',
  newPassword: '',
  confirmPassword: '',
  location: '',

}

const initialRegistrations = []
const initialDisabled = true;

const App = ()  => {

  const [ registrations, setRegistrations ] = useState(initialRegistrations)
  const [registerFormVal, setRegisterFormVal ] = useState(initialRegisterFormValues)
  const [formErrors, setFormErrors ] = useState(regFormErrors)
  const [disabled, setDisabled ] = useState(initialDisabled)
  
  {/* */}

  const inputChange = ( name, value ) => {

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...regFormErrors,
          [name]: '',
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })

      setRegisterFormVal({
        ...registerFormVal,
        [name]: value
      })

  }
  
  return (
    
    <div className="App">
      
      <Switch>
       {/* react 1 developer  */}
      <Route  path="/UserRegister">
        <UserRegister 
        values={registerFormVal}
        errors={formErrors}
        inputChange={inputChange}
        disabled={disabled}
        />
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
