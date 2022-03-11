import {combineReducers} from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import nameReducer from "./name/name.reducer";
import emailNumReducer from "./emailNum/emailNum.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist:["fp"]
  }

const rootReducer = combineReducers({
    name:nameReducer,
    fp:emailNumReducer
   
})

export default persistReducer(persistConfig,rootReducer)