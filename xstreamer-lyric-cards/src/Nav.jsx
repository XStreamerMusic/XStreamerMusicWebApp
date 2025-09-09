import Logo from './assets/logo.svg';
import SwitchInput from './SwitchInput/SwitchInput';

function Nav() {
    return (
        <nav>
            <img src={Logo} className='logo' alt="The Official XStreamer Music Logo" />
            <SwitchInput />
        </nav>
    )
}

export default Nav;