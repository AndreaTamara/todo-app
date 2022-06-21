import { useContext } from 'react';
import { ThemeContext } from '../../Context';
import './Loading.css'
function Loading({count}) {

    const {darkMode} = useContext(ThemeContext)

    return (

        <div className={`loading-container ${darkMode?'loading-container-dark-mode':''}`}>
            {
                Array(count).fill(0).map((el,i) => {
                    return (
                        <div key={i} className='loading-item'>
                            <span className='loading-circle' />
                            <div className='loading-highlight' />
                        </div>
                    )
                }
                )
            }
        </div>




    )
}

export { Loading }