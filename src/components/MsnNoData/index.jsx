import { TodoIcons } from "../TodoIcons";
import './MsnNoData.css';
import { selectedMode } from '../../Slices/modeSlice';
import { useSelector } from "react-redux"

function MsnNoData({ message }) {

    const darkMode = useSelector(selectedMode)

    return (
        <div className={`msn-container ${darkMode?'msn-container-dark-mode':''}`}>

            <TodoIcons typeIcon='alert' color='hsl(220, 98%, 61%)' />

            <p className="msn-text">{message}</p>
        </div>
    )
}

export { MsnNoData }