import { useState } from "react"
import './TodoEditForm.css';
import { selectedMode } from '../../Slices/modeSlice';
import { useSelector } from "react-redux"


function TodoEditForm({ textToEdit, idToEdit, setOpenModal, editTextTodo }) {
    
    const darkMode = useSelector(selectedMode)
    const [newText, setNewText] = useState(textToEdit)
    

    const onCancel = () => {
        setOpenModal(false)
    }

    const onChange = (e) => {
        setNewText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editTextTodo(newText,idToEdit)
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