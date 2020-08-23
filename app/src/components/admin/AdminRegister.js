/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";

import store from "../../state-manegment/store";
import {
  valueChanger,
  valueClearing,
} from "../../state-manegment/foodTruckReducer";

const AdminRegister = () => {
  const register = useSelector((state) => state.register);
  console.log(register);

  const { push } = useHistory();

  const valueUpdate = (event) => {
    const { name, value } = event.target;
    store.dispatch(valueChanger(value, name));
  };

  const submit = (event) => {
    event.preventDefault();
    console.log("submitting!!!!!");
    store.dispatch(valueClearing());
    push("/Hello");
  };

  return (
    
      <div className="marginR">
        <Segment placeholder>
          <Form onSubmit={submit}>
            <div className="register-div">Username</div>
            <Form.Input
              type="text"
              name="usernameR"
              id="usernameR"
              placeholder="Enter Your Username"
              value={register.usernameR}
              onChange={valueUpdate}
            />

            <div className="register-div">Email</div>
            <Form.Input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={register.email}
              onChange={valueUpdate}
            />

            <div className="register-div">Password</div>
            <Form.Input
              type="text"
              name="passwordR"
              id="passwordR"
              placeholder="Enter Your Password"
              value={register.passwordR}
              onChange={valueUpdate}
            />

            <div className="register-div">Confirm Your Password</div>
            <Form.Input
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confrim Your Password"
              value={register.confirmPassword}
              onChange={valueUpdate}
            />

            <Button content="Submit" className="green" />
          </Form>
        </Segment>
        <div className="register-link">
        already have an account ? <Link to="/AdminLogin">&nbsp; &nbsp;Login</Link>
      </div>
      </div>
      
    
  );
};

export default AdminRegister;
