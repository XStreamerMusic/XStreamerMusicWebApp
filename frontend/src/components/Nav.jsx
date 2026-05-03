import '../styles/nav.css'

import { useRef, useState } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { NavLink, Link} from 'react-router-dom'

function Nav () {

    const mobileNav = useRef()
    const [navToggled, setNavToggled] = useState(false)
    
    const toggleNav = () => {
        if (!navToggled) {
            mobileNav.current.classList.add('toggled')
            setNavToggled(prev => !prev)
        } else {
            mobileNav.current.classList.remove('toggled')
            setNavToggled(prev => !prev)
        }
    }

    return (
        <nav>
            <div className="nav-container">
                <NavLink className='nav-logo' to='/'>
                    <img
                        src="/brand/logo.png"
                        alt="XStreamer Music official logo - white against transparent background"
                    />
                </NavLink>

                <ul className='nav-list'>
                    <NavLink className='site-link' to='/waitlist'>
                        Join Our Waitlist
                    </NavLink>
                    <NavLink className='site-link' to='/giveaways'>
                        Giveaways
                    </NavLink>
                </ul>

                {/* responsive */}
                <button
                    type="button"
                    onClick={toggleNav}
                    className='nav-toggle'
                >
                    <HiOutlineMenuAlt3 />
                </button>
            </div>
            <div id="mobile-nav" ref={mobileNav}>
                <div className="header">
                    <NavLink className='nav-logo' to='/'>
                        <img
                            src="/brand/logo.png"
                            alt="XStreamer Music official logo - white against transparent background"
                        />
                    </NavLink>

                    {/* responsive */}
                    <button
                        type="button"
                        onClick={toggleNav}
                        className='nav-toggle'
                    >
                        <IoIosCloseCircle />
                    </button>
                </div>
                <ul className="nav-list mobile">
                    <NavLink className='site-link' to='/waitlist'>
                        Join Our Waitlist
                    </NavLink>
                    <NavLink className='site-link' to='/giveaways'>
                        Giveaways
                    </NavLink>
                </ul>
            </div>
        </nav>
    )
}

export default Nav