import './TodoCounter.css';
import { selectedMode } from '../../Slices/modeSlice';
import { useSelector } from "react-redux"

function TodoCounter ({totalUncompletedTodos}){
    const darkMode = useSelector(selectedMode)
return(
    <p className={`counter ${darkMode?'counter-dark-mode':''}`}>
        {totalUncompletedTodos} items left
    </p>
)
}
export {TodoCounter}