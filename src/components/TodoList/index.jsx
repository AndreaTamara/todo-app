import './TodoList.css';
import { selectedMode } from '../../Slices/modeSlice';
import { useSelector } from "react-redux"

function TodoList ({children}){

    const darkMode = useSelector(selectedMode)
    
    
    return(
        <ul  className={`todo-list-container ${darkMode?'todo-list-container-darkMode':''}`}>
            {children}
        </ul>
    )
}

export {TodoList}