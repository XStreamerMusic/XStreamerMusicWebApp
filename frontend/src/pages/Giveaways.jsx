import '../styles/giveaways.css'
import { giveaways } from '../data/giveawaysData'
import { useEffect, useRef } from 'react';
import Nav from "../components/Nav";

import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";    

import spotifyCard from '../assets/giveaways/spotify-gift-card.png'
import appleCard from '../assets/giveaways/apple-gift-card.png'
import googleCard from '../assets/giveaways/google-gift-card.png'

function Giveaways () {

    const mainContainer = useRef()

    useEffect(() => {
        const rootElement = mainContainer.current.parentElement
        rootElement.classList.add('giveaways')
    }, [])

    return (
        <>
            <Helmet>
                <title>Free Monthly Music Giveaways | XStreamer Music</title>

                <meta
                    name="description"
                    content="Win Spotify, Apple Music and YouTube Music gift cards every month. Enter free music giveaways, discover new artists and never miss your chance to win with XStreamer Music."
                />

                <link
                    rel="canonical"
                    href="https://www.xstreamermusic.xyz/giveaways"
                />

                <meta property="og:url" content="https://www.xstreamermusic.xyz/giveaways" />

                <meta property="og:title" content="Free Monthly Music Giveaways | XStreamer Music" />
                <meta property="og:description" content="Win Spotify, Apple Music and YouTube Music gift cards every month. Enter free music giveaways, discover new artists and never miss your chance to win with XStreamer Music." />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Free Monthly Music Giveaways | XStreamer Music" />
                <meta name="twitter:description" content="Win Spotify, Apple Music and YouTube Music gift cards every month. Enter free music giveaways, discover new artists and never miss your chance to win with XStreamer Music." />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "@id": "https://www.xstreamermusic.xyz/giveaways/#webpage",
                        url: "https://www.xstreamermusic.xyz/giveaways",
                        name: "Free Monthly Music Giveaways | XStreamer Music",
                        description: "Win Spotify, Apple Music and YouTube Music gift cards every month. Enter free music giveaways and never miss your chance to win with XStreamer Music.",
                        isPartOf: {
                            "@id": "https://www.xstreamermusic.xyz/#website"
                        },
                        about: {
                            "@id": "https://www.xstreamermusic.xyz/#organization"
                        }
                    })}
                </script>
            </Helmet>
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