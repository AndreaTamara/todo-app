import bgMobileLight from '../../assets/bg-mobile-light.jpg';
import bgMobileDark from '../../assets/bg-mobile-dark.jpg';
import bgDesktopLight from '../../assets/bg-desktop-light.jpg';
import bgDesktopDark from '../../assets/bg-desktop-dark.jpg';
import './Background.css';
import { selectedMode } from '../../Slices/modeSlice';
import { useSelector } from "react-redux"



function Background() {

    const darkMode = useSelector(selectedMode)
    
    return (
        <div
            className={`background ${ darkMode ? 'background-dark-mode' : '' }`}>
            <picture>
                <source
                    media='(max-width:376px)'
                    srcSet={darkMode ? bgMobileDark : bgMobileLight}
                    className='image-mobile' />
                <img
                    src={darkMode ? bgDesktopDark : bgDesktopLight}
                    alt='mountains background'
                    className='image-desk' />
            </picture>

        </div>
    )
}

export { Background }