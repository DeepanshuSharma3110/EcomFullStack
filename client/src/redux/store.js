import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './reducers/UserReducer.js'
import adminReducer from './reducers/admin.Reducers.js';
import websiteReducer from './reducers/websiteReducer.js'
import OrderReducer from "./reducers/orderReducer.js";
const mainReducer = combineReducers({
    user : userReducer,
    admin : adminReducer,
    website : websiteReducer,
    order : OrderReducer,
});


const store = configureStore({
    reducer:mainReducer
})

export default store;