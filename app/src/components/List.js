/** @format */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  axiosCallUser,
  valueClearing,
} from "../state-manegment/foodTruckReducer";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { Button, Form} from "semantic-ui-react";
import store from "../state-manegment/store";

import { useAdminForm } from "../hooks/useAdminForm";

const List = () => {
  const user = useSelector((state) => state.user);
  const [state, valueUpdate] = useAdminForm();
  const addList = state.addList;
  const updateList = state.updateList;
  const { push } = useHistory();
  const [updateToggle, setUpdateToggle] = useState(0);

  useEffect(() => {
    store.dispatch(axiosCallUser());
  }, []);

  const addlist = () => {
    axiosWithAuth()
      .post(`users/1/lists`, addList)
      .then((res) => {
        console.log("addlist success", res.data.listname);
        store.dispatch(axiosCallUser());
      })
      .catch((err) => console.log("addlist faild", err));
  };

  const listUpdating = (listID, event) => {
    event.preventDefault();
    const updateObj = { listname: updateList.listUpdate };
    axiosWithAuth()
      .put(`users/1/lists/${listID}`, updateObj)
      .then(() => {
        store.dispatch(valueClearing());
        setUpdateToggle(0);
        store.dispatch(axiosCallUser());
      })
      .catch((err) => console.log("updating List Error", err));
  };

  const deleteList = (listID) => {
    axiosWithAuth()
      .delete(`users/1/lists/${listID}`)
      .then(() => {
        store.dispatch(axiosCallUser());
      })
      .catch((err) => console.log("deleting List Error", err));
  };

  const submit = (event) => {
    event.preventDefault();
    addlist();
    store.dispatch(valueClearing());
  };

  return (
      <div className="flex">
    <div className="container">
      {user.map((data) => (
          <div key={data.id} className="flex2">
        <div key={data.id} className="container2">
          <div>List name: {data.listname}</div>
          <button onClick={() => setUpdateToggle(data.id)}>
            Update List name
          </button>
          <button  onClick={() => deleteList(data.id)}>Delete List</button>
          <button onClick={() => push(`/list/Todos/${data.id}`)}>
            View Todos
          </button>
          <div className={updateToggle == data.id ? "show" : "no-show"}>
            <Form onSubmit={(event) => listUpdating(data.id, event)}>
              
                <Form.Input
                  type="text"
                  name="listUpdate"
                  id="listUpdate"
                  placeholder="Update List Name"
                  value={updateList.listUpdate}
                  onChange={valueUpdate}
                />
              
              <Button className="blue"> Update</Button>
            </Form>
            <div className="button-margin"> 
            <Button 
            className="orange"
              onClick={() => {
                setUpdateToggle(0);
                store.dispatch(valueClearing());
              }}
            >
              cancle
            </Button>
            </div>
          </div>
        </div>
        </div>
      ))}
      <div>
        <Form onSubmit={submit}>
          
            <Form.Input
              type="text"
              name="listname"
              id="listname"
              placeholder="Enter List Name"
              value={addList.listname}
              onChange={valueUpdate}
            />
          
          <Button type="submit" className="green" >Add List</Button>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default List;
