import { useState } from 'react';
import './CreateTodoInput.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

function CreateTodoInput({ addTodo }) {

    const {darkMode} = useContext(ThemeContext)
    const [newTodoText, setNewTodoText] = useState('');

    const onChange = (e) => {
        setNewTodoText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        addTodo(newTodoText)
        setNewTodoText('')
    }

    return (
        <form
            className='create-todo-input-container'
            onSubmit={onSubmit}
        >
            <input
                type='text'
                className={`create-todo-input ${darkMode?'create-todo-input-darkMode':''}`}
                placeholder="Create a new to-do..."
                value={newTodoText}
                onChange={onChange}
            />
        </form>
    )
}

export { CreateTodoInput }
