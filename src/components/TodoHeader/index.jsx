import { TodoIcons } from "../TodoIcons";
import { selectedMode, switchMode } from '../../Slices/modeSlice';
import { useSelector,useDispatch } from "react-redux"
import './TodoHeader.css'

function TodoHeader() {
    const darkMode = useSelector(selectedMode)
    const dispatch = useDispatch()
    
    return (
        <div className="header">
            <h1 className="tittle">TODO</h1>

            <span onClick={()=>dispatch(switchMode()) }>
                <TodoIcons
                    typeIcon={darkMode ? 'sun' : 'moon'}
                    color={'hsl(0,0%,100%)'}
                />
            </span>
        </div>
    )
}

export { TodoHeader }