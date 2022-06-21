import { useState } from "react"
import './TodoEditForm.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';


function TodoEditForm({ textToEdit, setOpenModal, editTextTodo }) {
    
    const {darkMode} = useContext(ThemeContext)
    const [newText, setNewText] = useState(textToEdit)

    const onCancel = () => {
        setOpenModal(false)
    }

    const onChange = (e) => {
        setNewText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editTextTodo(newText, textToEdit)
        setOpenModal(false);
    }

    return (
        <form
            className={`form-container ${darkMode?'form-container-dark-mode':''}`}
            onSubmit={onSubmit}>

            <textarea
                className='form-textarea'
                defaultValue={textToEdit}
                onChange={onChange}
            />
            <div className="btn-modal-container">
                <button
                    className='btn-modal btn-cancel'
                    type='button'
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    className='btn-modal btn-save'
                    type='submit'
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export { TodoEditForm }