import { useState, useEffect } from "react";

function SwitchInput() {

    const [darkMode, setDarkMode] = useState(false)

    function flip (event) {
        setDarkMode(prevState => !prevState)
    }

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <button
            id="dark-mode-switch"
            className='switch-input'
            role="switch"
            onClick={flip} type="button">
        </button>
    )
}

export default SwitchInput