import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./Slices/authSlice";
import profileSlice from "./Slices/profileSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'profile'] 
};

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;