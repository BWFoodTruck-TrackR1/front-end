import store from "../state-manegment/store"
import { useSelector } from "react-redux";
import {valueChanger} from "../state-manegment/foodTruckReducer"

export const useAdminForm = () =>{
    const state = useSelector((state) => state);
 

    const valueUpdate = (event) => {
      const { name, value } = event.target;
      store.dispatch(valueChanger(value, name));
    };
    return [state, valueUpdate]
}
