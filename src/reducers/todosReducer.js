import { TYPES } from "../actions/todosActions";

export const setTodosInitialState = (initialState) => {
    let parsedData

    const localStorageData = localStorage.getItem('TODOS_V2-APP');

    if (!localStorageData || localStorageData === 'undefined') {
        parsedData = initialState.todos
        localStorage.setItem('TODOS_V2-APP', JSON.stringify(initialState.todos));
    } else {
        parsedData = JSON.parse(localStorageData)
    }
    return {
        ...initialState,
        todos: parsedData,
        isLoading: false
    }
}

export const saveNewData = (newData) => {
    localStorage.setItem('TODOS_V2-APP', JSON.stringify(newData));
}

export const todosInicialState = {
    todos: [],
    isLoading: true
}

export function todosReducer(state, action) {
    switch (action.type) {
        case TYPES.ADD_NEW_TODO:
            return {
                ...state,
                todos: [...state.todos, { text: action.payload, completed: false}]
            }
        case TYPES.TOOGLE_COMPLETE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.text === action.payload ?
                        { ...todo, completed: !todo.completed }
                        :
                        todo
                )
            }
        case TYPES.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.text !== action.payload)
            }
        case TYPES.CLEAR_COMPLETED_TODOS:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            }
        case TYPES.REORDER_TODOS: {

            const { result } = action.payload;
            const { source, destination } = result
            if (!destination) return state;
            if (source.index === destination.index
                && source.droppableId === destination.droppableId) return state;
            const newTodos = [...state.todos];
            const [removed] = newTodos.splice(source.index, 1);
            newTodos.splice(destination.index, 0, removed);
            return {
                ...state,
                todos: newTodos
            }

        }
        case TYPES.EDIT_TEXT_TODO: {

            const { newText, previousText } = action.payload
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.text === previousText ?
                        { ...todo, text: newText }
                        :
                        todo
                )
            }
        }
        default: return state;
    }
}