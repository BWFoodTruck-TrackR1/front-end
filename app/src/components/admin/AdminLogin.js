/** @format */

import React from "react";
import store from "../../state-manegment/store";
import { useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

import {
  valueChanger,
  valueClearing,
} from "../../state-manegment/foodTruckReducer";

const AdminLogin = () => {
  const login = useSelector((state) => state.login);
  console.log(login);

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
    <div className="margin">
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form onSubmit={submit}>
              <Form.Input
                placeholder="Username"
                icon="user"
                iconPosition="left"
                type="text"
                name="username"
                id="username"
                value={login.username}
                onChange={valueUpdate}
              />

              <Form.Input
                type="text"
                name="password"
                id="password"
                icon="lock"
                iconPosition="left"
                value={login.password}
                onChange={valueUpdate}
              />

              <Button content="Login" className="green" />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button
            className="blue"
              content="Sign up"
              icon="signup"
              size="big"
              onClick={() => push("/AdminRegister")}
            />
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  );
};

export default AdminLogin;
