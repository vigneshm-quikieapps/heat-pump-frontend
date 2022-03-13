import {combineReducers} from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import emailNumReducer from "./emailNum/emailNum.reducer";
import customerDetailsReducer from "./customerDetails/customerDetails.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist:["fp","cdr"]
  }

const rootReducer = combineReducers({
    fp:emailNumReducer,
    cdr:customerDetailsReducer,
   
})

export default persistReducer(persistConfig,rootReducer)