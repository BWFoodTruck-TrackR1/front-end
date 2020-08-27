/** @format */

import React from "react";
import store from "../../state-manegment/store";
import { useHistory } from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import axios from "axios";
import { valueClearing } from "../../state-manegment/foodTruckReducer";

import { useAdminForm } from "../../hooks/useAdminForm";

const AdminLogin = () => {
  const [state, valueUpdate] = useAdminForm();
  const login = state.login;
  const { push } = useHistory();
  console.log(login);

  const axiosLogin = () => {
    axios
      .post(`https://wunderlist2backend.herokuapp.com/api/login`, login)

      .then((res) => {
        localStorage.setItem("token", res.data.token);
        store.dispatch(valueClearing());
        push("/list");
      })
      .catch((err) => console.log("noo", err));
  };

  const submit = (event) => {
    event.preventDefault();
    axiosLogin();
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
