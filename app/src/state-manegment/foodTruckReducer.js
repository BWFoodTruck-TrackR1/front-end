/** @format */

// import axios from "axios";
// import store from "./store";
import {axiosWithAuth} from "../utils/axiosWithAuth"

// actions

const VALUE_CHANGE = "VALUE_CHANGE";
const VALUE_CLEAR = "VALUE_CLEAR";
const USER_SUCCESS = "USER_SUCCESS";
const TODO_SUCCESS = "TODO_SUCCESS"



// action creatores

export const valueChanger = (values, name) => {
  return {
    type: VALUE_CHANGE,
    payload: values,
    name,
  };
};

export const valueClearing = () => {
  return {
    type: VALUE_CLEAR
  }
}


export const axiosCallUser = () => dispatch => {
  
  axiosWithAuth()
  .get(`users/1/lists`)
  .then(res =>{
      dispatch({type: USER_SUCCESS, payload: res.data})
  })
  .catch(e => {
      console.log( "here's the error message",e)
  })
}

export const axiosCAllTodo = (id) => dispatch => {
  axiosWithAuth()
  .get(`users/1/lists/${id}/todos`)
  .then(res =>{
      dispatch({type: TODO_SUCCESS, payload: res.data})
  })
  .catch(e => {
      console.log( "here's the error message",e)
  })
}



// initailstate

const intialState = {
  login: { username: "", password: "" },
  register: {usernameR: "", email: "", passwordR: "", confirmPassword: "" },
  user : [],
  addList: {listname: ""},
  updateList: {listUpdate: ""},
  todos: [],
  addTodo: {todo:  ""},
  updaTodo: {todoUpdate: ""},
};

//resucer

const foodTruckReducer = (state = intialState, action) => {
  switch (action.type) {

    case VALUE_CHANGE:
      return {
        ...state,
        login: { ...state.login, [action.name]: action.payload },
        register: {...state.register, [action.name]: action.payload},
        addList: {...state.addList, [action.name]: action.payload },
        updateList: {...state.updateList, [action.name]: action.payload},
        addTodo: {...state.addTodo, [action.name]: action.payload},
        updaTodo: {...state.updateList, [action.name]: action.payload},
      };

      case VALUE_CLEAR: 
        return {
          ...state,
          login: {username: "", password: ""},
          register: {usernameR: "", email: "", passwordR: "", confirmPassword: "" },
          addList: {listname: ""},
          updateList: {listUpdate: ""},
          addTodo: {todo:  ""},
          updaTodo: {todoUpdate: ""},
        }

        case USER_SUCCESS: 
        return {
          ...state,
          user: action.payload
        }

        case TODO_SUCCESS: 
        return {
          ...state,
          todos: action.payload
        }

    default:
      return state;
  }
};

export default foodTruckReducer;
