/** @format */

// import axios from "axios";
// import store from "./store";

// actions

const VALUE_CHANGE = "VALUE_CHANGE";
const VALUE_CLEAR = "VALUE_CLEAR";
const LOGIN = "LOGIN"

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

//this is an example of redux axios call I need to code

// export const axiosCall =(inputvalue) => dispatch => {
    


//   dispatch({type: FITCHING_START})

//   axios.get(`https://api.github.com/users/${inputvalue}`)
//   .then(res =>{
      
//       dispatch({type: CALL_SUCCESS, paylaod: res.data})
//   })
//   .catch(e => {
//       console.log( "here's the message",e)

//       dispatch({type: CALL_FAILURE})
      
//       // nee to conclelog the resulet
//   })

// }

// initailstate

const intialState = {
  login: { username: "", password: "" },
  register: {usernameR: "", email: "", passwordR: "", confirmPassword: "" }
};

//resucer

const foodTruckReducer = (state = intialState, action) => {
  switch (action.type) {

    case VALUE_CHANGE:
      return {
        ...state,
        login: { ...state.login, [action.name]: action.payload },
        register: {...state.register, [action.name]: action.payload}
      };

      case VALUE_CLEAR: 
        return {
          ...state,
          login: {username: "", password: ""},
          register: {usernameR: "", email: "", passwordR: "", confirmPassword: "" }
        }

    default:
      return state;
  }
};

export default foodTruckReducer;
