import './TodoCounter.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

function TodoCounter ({totalUncompletedTodos}){
    const {darkMode} = useContext(ThemeContext)
return(
    <p className={`counter ${darkMode?'counter-dark-mode':''}`}>
        {totalUncompletedTodos} items left
    </p>
)
}
export {TodoCounter}