import { configureStore } from "@reduxjs/toolkit";
//import reducers from slices
import todosReducer  from './Slices/todosSlice';
import filterReducer  from './Slices/filterSlice';
import modeReducer from './Slices/modeSlice'

export const store = configureStore({
    reducer:{
       todos: todosReducer,
        filter: filterReducer,
        mode: modeReducer  
    }
})