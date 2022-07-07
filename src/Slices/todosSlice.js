import { createSlice, nanoid,createAsyncThunk } from "@reduxjs/toolkit";

const parsedInitialState = localStorage.getItem('TODOS_V2-APP')

 const todosInicialState = {
    todos: JSON.parse(parsedInitialState),
    isLoading: true,
    error: false
}


export const getTodos = createAsyncThunk('todos/getTodos', (dataName,initialValue)=>{
    try {
        let response = new Promise((resolve,reject)=>{
            setTimeout(() => {
                const localeStorageData = localStorage.getItem(dataName);
                let parsedData
                if (!localeStorageData || localeStorageData==='undefined' || localeStorageData==='null') {
                    localStorage.setItem(dataName, JSON.stringify(initialValue))
                    parsedData = initialValue;
                } else {
                    parsedData = JSON.parse(localeStorageData)
                }
                resolve(parsedData) 
    
            }, 1000);
        });
        return response

    } catch (error) {
        
        return error
    }
})

export const saveNewData = (newData) => {
    localStorage.setItem('TODOS_V2-APP', JSON.stringify(newData));
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: todosInicialState,
    reducers: {
        addNewTodo:{
            reducer(state,action){
                const newTodo = {text: action.payload, completed: false, id: nanoid()}
                state.todos = state.todos.concat(newTodo)
            }
        },
        toogleCompleteTodo:{
            reducer(state,action){
                const indexTodoToEdit= state.todos.findIndex(todo=>todo.id===action.payload)
                state.todos[indexTodoToEdit].completed = !state.todos[indexTodoToEdit].completed
            }
        },
        deleteOneTodo:{
            reducer(state,action){
                state.todos = state.todos.filter(todo => todo.id !== action.payload)
            }
        },
        deleteCompletedTodos:{
            reducer(state){
                state.todos = state.todos.filter(todo => !todo.completed)
            }
        },
        editTodo:{
            reducer(state,action){
                const { newText, id } = action.payload
                const indexTodoToEdit= state.todos.findIndex(todo=>todo.id===id)
                state.todos[indexTodoToEdit].text = newText
            }
        },
        reorderTodos:{
            reducer(state,action){
                const { result } = action.payload;
                const { source, destination } = result
                if (!destination) return state;
                if (source.index === destination.index
                    && source.droppableId === destination.droppableId) return state;
                const newTodos = [...state.todos];
                const [removed] = newTodos.splice(source.index, 1);
                newTodos.splice(destination.index, 0, removed);
                state.todos = newTodos
                
            }
        }
    },
    extraReducers(builder){
        builder
        .addCase(getTodos.fulfilled, (state,action)=>{
            state.isLoading =false;
            state.todos = action.payload
        })
    }
})

export default todosSlice.reducer;
export const { addNewTodo, toogleCompleteTodo,deleteOneTodo,deleteCompletedTodos, editTodo,reorderTodos } = todosSlice.actions
export const selectAllTodos = (state) => state.todos.todos;
export const getTodosStatus = (state) => state.todos.isLoading;
export const getTodosError = (state) => state.todos.error;