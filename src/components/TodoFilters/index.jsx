import './TodoFilters.css';
import { selectedMode } from '../../Slices/modeSlice';
import { useSelector } from "react-redux"

function TodoFilters({ setFilter, filter }) {

    const darkMode = useSelector(selectedMode)

    return (
        <div className='todo-filter-bar'>
            <button
                className={`todo-btn ${filter === 'all' ? 'filter-active' : ''} 
                            ${darkMode ? 'todo-btn-darkMode' : ''}`}
                onClick={() => setFilter('all')}
            >
                All
            </button>
            <button
                className={`todo-btn ${filter === 'active' ? 'filter-active' : ''} 
                            ${darkMode ? 'todo-btn-darkMode' : ''}`}
                onClick={() => setFilter('active')}
            >
                Active
            </button>
            <button
                className={`todo-btn ${filter === 'completed' ? 'filter-active' : ''} 
                            ${darkMode ? 'todo-btn-darkMode' : ''}`}
                onClick={() => setFilter('completed')}
            >
                Completed
            </button>
        </div>
    )
}
export { TodoFilters }