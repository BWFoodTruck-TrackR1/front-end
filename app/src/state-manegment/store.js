import {createStore,applyMiddleware} from "redux"
import foodTruckReducer from "./foodTruckReducer"
import thunk from "redux-thunk"



const store = createStore(foodTruckReducer,applyMiddleware(thunk))
export default store;