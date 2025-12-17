import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/RootReducer";

export const reduxStore = configureStore({reducer:rootReducer});