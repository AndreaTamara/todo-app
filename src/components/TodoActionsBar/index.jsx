import { TodoCounter } from '../TodoCounter';
import { TodoFilters } from '../TodoFilters';
import { ClearCompletedTodoBtn } from '../ClearCompletedTodoBtn';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

import './TodoActionsBar.css'

function TodoActionsBar({ totalUncompletedTodos, clearCompletedTodos, setFilter, filter }) {
    const { darkMode } = useContext(ThemeContext)
    return (
        <div className='todo-action-bar'>

            <div
                className={`desktop-filter-bar-container 
                            ${darkMode ? 'desktop-filter-bar-container-darkMode' : ''}`}
            >
                <TodoCounter totalUncompletedTodos={totalUncompletedTodos} />
                <div className='desktop-filter-bar' >
                    <TodoFilters
                        setFilter={setFilter}
                        filter={filter}
                    />
                </div>
                <ClearCompletedTodoBtn clearCompletedTodos={clearCompletedTodos} />
            </div>

            <div
                className={`mobile-filter-bar-container 
                            ${darkMode ? 'mobile-filter-bar-container-darkMode' : ''}`}
            >
                <TodoFilters
                    setFilter={setFilter}
                    filter={filter}
                />
            </div>
        </div>
    )

}
export { TodoActionsBar }