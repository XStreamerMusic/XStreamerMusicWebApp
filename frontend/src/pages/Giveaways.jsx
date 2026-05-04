import '../styles/giveaways.css'
import { giveaways } from '../data/giveawaysData'
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
            <main ref={mainContainer} className='giveaways'>
                <header>
                    <Nav />
                    <h1 className="site-heading">Giveaways</h1>
                    <div className="promo-section">
                        <img src='/promo/giveaways.jpg' alt="" />
                    </div>
                </header>
                <div className="prize-grid">
                    <Link className="prize-card" to="/giveaways/spotify-premium">
                        <div className="prize-img">
                            <img src={spotifyCard} alt="Spotify Premium gift card" />
                        </div>
                        <p className="site-p">
                            Spotify Premium - 
                            1 Month
                            <span>Ends on 10 May, 16:00</span>
                        </p>
                    </Link>

                    <Link className="prize-card" to="/giveaways/apple-music">
                        <div className="prize-img">
                            <img src={appleCard} alt="Apple Music gift card" />
                        </div>
                        <p className="site-p">
                            Apple Music - 
                            1 Month
                            <span>Ends on 10 May, 16:00</span>
                        </p>
                    </Link>

                    <Link className="prize-card" to="/giveaways/youtube-music">
                        <div className="prize-img">
                            <img src={googleCard} alt="YouTube Music gift card" />
                        </div>
                        <p className="site-p">
                            YouTube Music - 
                            1 Month
                            <span>Ends on 10 May, 16:00</span>
                        </p>
                    </Link>
                </div>
            
            </main>

        </>
    )
}

export default Giveaways;