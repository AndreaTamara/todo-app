import { configureStore } from "@reduxjs/toolkit";
//import reducers from slices
import todosReducer  from './Slices/todosSlice'

export const store = configureStore({
    reducer:{
       todos:todosReducer,
        //users: usersReducer
        
    }
})