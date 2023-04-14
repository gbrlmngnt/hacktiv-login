import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user';
import userloginReducer from "./userlogin";

export const store = configureStore ({
    reducer: {
        user: userReducer,
        login: userloginReducer
    }
})