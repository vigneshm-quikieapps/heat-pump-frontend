import {combineReducers} from "redux";
import nameReducer from "./name/reducer";



export default combineReducers({
    name:nameReducer,
   
})