import './TodoList.css';
import { selectedMode } from '../../Slices/modeSlice';
import { useDispatch, useSelector } from "react-redux"
import { Reorder } from "framer-motion"
import { reorderTodos, selectAllTodos } from '../../Slices/todosSlice';

function TodoList ({children}){

    const darkMode = useSelector(selectedMode)
    const allTodos= useSelector(selectAllTodos)
    const dispacth = useDispatch()
    const onDragAndDrop = (newOrder) =>
    {dispacth(reorderTodos({newOrder}))}

    
    return(
        <Reorder.Group
        axis='y'
        onReorder={(newOrder)=>onDragAndDrop(newOrder)}
        values={allTodos}
        layoutScroll
        as='ul'
        className={`todo-list-container ${darkMode?'todo-list-container-darkMode':''}`}>
            {children}
        </Reorder.Group>
    )
}

export {TodoList}