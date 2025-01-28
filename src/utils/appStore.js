 import { configureStore } from "@reduxjs/toolkit";
 import { configure } from "@testing-library/react";
import userReducer from "./userSlice";
const appStore = configureStore(
    {
        reducer:{
            user: userReducer,
        }
    }
)


export default appStore;