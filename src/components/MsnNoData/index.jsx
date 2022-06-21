import { TodoIcons } from "../TodoIcons";
import './MsnNoData.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

function MsnNoData({ message }) {

    const {darkMode} = useContext(ThemeContext)

    return (
        <div className={`msn-container ${darkMode?'msn-container-dark-mode':''}`}>

            <TodoIcons typeIcon='alert' color='hsl(220, 98%, 61%)' />

            <p className="msn-text">{message}</p>
        </div>
    )
}

export { MsnNoData }