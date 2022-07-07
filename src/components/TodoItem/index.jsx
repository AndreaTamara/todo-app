
import { TodoIcons } from '../TodoIcons'
import './TodoItem.css'
import { selectedMode } from '../../Slices/modeSlice';
import { useSelector } from "react-redux"

function TodoItem ({ text, completed, onComplete,deleteTodo, openEditTodo, id}) {

    const darkMode = useSelector(selectedMode)
    
    return (
        <li className={`todo-item-container ${darkMode?'todo-item-container-darkMode':''}`}>
            <span
                className={`circle-check 
            ${darkMode ? 'circle-check-dark-mode' : 'circle-check-ligth-mode'} 
            ${completed ? 'circle-check-completed' : ''}`}
                onClick={() => onComplete(id)}
            >
                <TodoIcons
                    typeIcon='check'
                    color={completed ? 'hsl(0, 0%, 100%)' : 'transparent'}
                />
            </span>
            <p 
                className={`todo-text ${completed ? 'todo-text-completed' : ''} 
                            ${darkMode?'todo-text-dark-mode':''}`}
            >
                {text} 
            </p>
            <div className='btns-container'>
                <span 
                className='edit-btn'
                onClick={() => openEditTodo(text,id)}
                >
                    <TodoIcons
                        typeIcon='edit'
                        color={darkMode ? 'hsl(234, 11%, 52%)' : 'hsl(236, 9%, 61%)'}
                    />
                </span>
                <span 
                className={`delete-btn
                ${darkMode ? 'delete-btn-dark-mode' : ''}`}
                onClick={() => deleteTodo(id)}
                >
                    <TodoIcons
                        typeIcon='delete'
                        color={darkMode ? 'hsl(234, 11%, 52%)' : 'hsl(236, 9%, 61%)'}
                    />
                </span>
            </div>
        </li>
    )
}
export { TodoItem }