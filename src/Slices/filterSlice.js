import { createSlice } from "@reduxjs/toolkit";

const filterInicialState = {
    filter:'all'//'active,completed,all
}

export const filterParams = (filter, todos)=>{
    let filterTodos
    let filterMessage
    switch (filter) {
        case 'active': {
          filterTodos = todos.filter(todo => !todo.completed);
          filterMessage = 'You have completed all your to-do´s';
          break;
        }
        case 'completed': {
          filterTodos = todos.filter(todo => todo.completed);
          filterMessage = 'You haven´t completed any to-do yet';
          break;
        }
        default: {
          filterTodos = todos;
          filterMessage = 'You haven´t create any to-do yet';
        }
      }
      return {filterTodos, filterMessage}
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInicialState,
    reducers: {
        selectFilter:{
            reducer(state,action){
                state.filter = action.payload
            }
        }
    }
})

export default filterSlice.reducer;
export const selectedFilter = (state) => state.filter.filter;
export const { selectFilter } = filterSlice.actions

