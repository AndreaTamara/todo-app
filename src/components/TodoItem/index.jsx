
import { TodoIcons } from '../TodoIcons'
import './TodoItem.css'
import { selectedMode } from '../../Slices/modeSlice';
import { useSelector } from "react-redux"
import { useMotionValue, Reorder } from "framer-motion";

function TodoItem ({ todo, onComplete,deleteTodo, openEditTodo}) {

    const darkMode = useSelector(selectedMode)
    const y = useMotionValue(0);
    
    return (
        <Reorder.Item
        key={todo.id}
        value={todo}
        as='li' 
        className={`todo-item-container ${darkMode?'todo-item-container-darkMode':''}`}>
            <span
                className={`circle-check 
            ${darkMode ? 'circle-check-dark-mode' : 'circle-check-ligth-mode'} 
            ${todo.completed ? 'circle-check-completed' : ''}`}
                onClick={() => onComplete(todo.id)}
            >
                <TodoIcons
                    typeIcon='check'
                    color={todo.completed ? 'hsl(0, 0%, 100%)' : 'transparent'}
                />
            </span>
            <p 
                className={`todo-text ${todo.completed ? 'todo-text-completed' : ''} 
                            ${darkMode?'todo-text-dark-mode':''}`}
            >
                {todo.text} 
            </p>
            <div className='btns-container'>
                <span 
                className='edit-btn'
                onClick={() => openEditTodo(todo.text,todo.id)}
                >
                    <TodoIcons
                        typeIcon='edit'
                        color={darkMode ? 'hsl(234, 11%, 52%)' : 'hsl(236, 9%, 61%)'}
                    />
                </span>
                <span 
                className={`delete-btn
                ${darkMode ? 'delete-btn-dark-mode' : ''}`}
                onClick={() => deleteTodo(todo.id)}
                >
                    <TodoIcons
                        typeIcon='delete'
                        color={darkMode ? 'hsl(234, 11%, 52%)' : 'hsl(236, 9%, 61%)'}
                    />
                </span>
            </div>
        </Reorder.Item>
    )
}
export { TodoItem }