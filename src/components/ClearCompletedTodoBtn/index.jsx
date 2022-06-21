import './ClearCompletedTodoBtn.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

function ClearCompletedTodoBtn({ clearCompletedTodos }) {

    const {darkMode} = useContext(ThemeContext)

    return (
        <button
            className={`clear-completed-btn ${darkMode?'clear-completed-btn-dark-mode':''}`}
            onClick={()=>clearCompletedTodos()}
        >
            Clear Completed
        </button>
    )
}
export { ClearCompletedTodoBtn }