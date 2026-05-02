import '../styles/giveaways.css'
import { useEffect, useRef } from 'react';
import Nav from "../components/Nav";

import { Link } from 'react-router-dom';

import spotifyCard from '../assets/giveaways/spotify-gift-card.png'
import appleCard from '../assets/giveaways/apple-gift-card.png'
import googleCard from '../assets/giveaways/google-gift-card.png'

function Giveaways () {

    document.title = "Giveaways - XStreamer Music"
    const mainContainer = useRef()

    useEffect(() => {
        const rootElement = mainContainer.current.parentElement
        rootElement.classList.add('giveaways')
    }, [])

    return (
        <>
            <Nav />
            <main ref={mainContainer}>
                <header>
                    <h1 className="site-heading">Giveaways</h1>
                    <div className="promo-section">
                        <img src='/promo/giveaways.jpg' alt="" />
                    </div>
                </header>
                <div className="prize-grid">
                    <Link to="/giveaways/spotify-premium" className="prize-card">
                        <div className="prize-img">
                            <img src={spotifyCard} alt="Spotify Premium gift card" />
                        </div>
                        <p className="site-p">
                            Spotify Premium<br />
                            1 Month
                        </p>
                    </Link>

                    <Link to="/giveaways/apple-music" className="prize-card">
                        <div className="prize-img">
                            <img src={appleCard} alt="Apple Music gift card" />
                        </div>
                        <p className="site-p">
                            Apple Music<br />
                            1 Month
                        </p>
                    </Link>

                    <Link to="/giveaways/youtube-music" className="prize-card">
                        <div className="prize-img">
                            <img src={googleCard} alt="YouTube Music gift card" />
                        </div>
                        <p className="site-p">
                            YouTube Music<br />
                            1 Month
                        </p>
                    </Link>
                </div>
            </main>
        </>
    )
}

export default Giveaways;