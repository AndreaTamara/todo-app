import './TodoList.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

function TodoList ({children}){

    const {darkMode} = useContext(ThemeContext)
    
    
    return(
        <ul  className={`todo-list-container ${darkMode?'todo-list-container-darkMode':''}`}>
            {children}
        </ul>
    )
}

export {TodoList}