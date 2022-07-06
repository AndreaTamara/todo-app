import { TYPES } from "../actions/todosActions";

export const setTodosInitialState = (initialState) => {
    let parsedData

    const localStorageData = localStorage.getItem('TODOS_V2-APP');

    if (!localStorageData || localStorageData === 'undefined') {
        parsedData = initialState.todos
        localStorage.setItem('TODOS_V2-APP', JSON.stringify(initialState.todos));
        console.log('setea localstorage con array vacio')
    } else {
        parsedData = JSON.parse(localStorageData)
        console.log('trae info de localstorage como json')
        console.log(parsedData)
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
    filter: {
        selected: 'all', //active,completed,all
        filterTodos: [],
        filterMessage: ''
    },
    isLoading: true
}

export function todosReducer(state, action) {
    switch (action.type) {
        case TYPES.ADD_NEW_TODO:
            return {
                ...state,
                todos: [...state.todos, { text: action.payload, completed: false }]
            }

        case TYPES.TOOGLE_COMPLETE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo, i) =>
                    (i + todo.text) === action.payload ?
                        { ...todo, completed: !todo.completed }
                        :
                        todo
                )
            }
        case TYPES.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo, i) => (i + todo.text) !== action.payload)
            }
        case TYPES.CLEAR_COMPLETED_TODOS:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            }

        case TYPES.REORDER_TODOS: {
            const { startIndex, endIndex } = action.payload
            const result = [...state.todos];
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return {
                ...state,
                todos: result
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