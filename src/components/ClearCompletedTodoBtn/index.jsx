import './ClearCompletedTodoBtn.css';
import { selectedMode } from '../../Slices/modeSlice';
import { useSelector } from "react-redux"

function ClearCompletedTodoBtn({ clearCompletedTodos }) {

    const darkMode = useSelector(selectedMode)

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