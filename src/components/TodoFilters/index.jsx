import './TodoFilters.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

function TodoFilters({ setFilter, filter }) {

    const {darkMode} = useContext(ThemeContext);

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