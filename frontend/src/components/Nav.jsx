import '../styles/nav.css'

import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { NavLink, Link} from 'react-router-dom'

function Nav () {

    return (
        <nav>
            <div className="nav-container">
                <NavLink className='nav-logo' to='/'>
                    <img
                        src="/brand/logo.png"
                        alt="XStreamer Music official logo - white against transparent background"
                    />
                </NavLink>

                {/* responsive */}
                <button
                    type="button"
                    className='nav-toggle'
                >
                    <HiOutlineMenuAlt3 />
                </button>
            </div>
        </nav>
    )
}

export default Nav