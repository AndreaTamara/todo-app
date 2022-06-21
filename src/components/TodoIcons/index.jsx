import {IoCloseOutline,IoAlertCircle} from 'react-icons/io5';
import {FaMoon} from 'react-icons/fa';
import {BsCheck, BsFillSunFill} from 'react-icons/bs';
import {MdOutlineEdit} from 'react-icons/md'
import './TodoIcons.css'

function TodoIcons({ typeIcon,color }) {

    const renderIcon = (typeIcon) => {
        switch (typeIcon) {
            case 'delete': return <IoCloseOutline className='delete-icon'/>;
            case 'check': return <BsCheck className='check-icon'/>;
            case 'edit': return <MdOutlineEdit className='edit-icon'/>;
            case 'moon': return <FaMoon className='moon-icon'/>;
            case 'sun': return <BsFillSunFill className='sun-icon'/>;
            case 'alert': return <IoAlertCircle className='alert-icon'/>;
            default: return <></>;
        }
    }


    return (
        <div className='icon-container'
           style={{ color: color }}
        >
            {renderIcon(typeIcon)}
        </div>

    )

}

export { TodoIcons }