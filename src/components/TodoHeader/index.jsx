import { TodoIcons } from "../TodoIcons";
import { useContext } from 'react';
import { ThemeContext } from '../../Context';
import './TodoHeader.css'

function TodoHeader() {
    const { darkMode, onDarkMode } = useContext(ThemeContext)
    return (
        <div className="header">
            <h1 className="tittle">TODO</h1>

            <span onClick={onDarkMode}>
                <TodoIcons
                    typeIcon={darkMode ? 'sun' : 'moon'}
                    color={'hsl(0,0%,100%)'}
                />
            </span>
        </div>
    )
}

export { TodoHeader }