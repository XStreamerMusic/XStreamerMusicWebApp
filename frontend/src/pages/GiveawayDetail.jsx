import '../styles/giveawayDetail.css'
import { getGiveawayImage } from "../utils/imports"

import { useRef, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Nav from '../components/Nav'
import { giveaways } from "../data/giveawaysData"

function GiveawayDetail() {
    const { slug } = useParams()
    const giveaway = giveaways.find(g => g.slug === slug)
    
    if (!giveaway) return <p>Giveaway not found</p>

    document.title = giveaway.title
    const mainContainer = useRef()

    useEffect(() => {
        const rootElement = mainContainer.current.parentElement
        rootElement.classList.add('giveawayDetail')
    }, [])

    return (
        <main ref={mainContainer} className='giveawayDetail'>
            <header>
                <Nav />
                <div className="prize-img">
                    <img src={getGiveawayImage(giveaway.name)} alt={`${giveaway.title} gift card`} />
                </div>
                <h1 className="site-heading">{giveaway.title}</h1>
                <p className="site-p">
                    {giveaway.description}
                </p>
                <div className="promo-section">
                    <img src='/promo/giveaways.jpg' alt="" />
                </div>
            </header>

            {/* <iframe
                src={giveaway.src}
                width="100%"
                height="650"
                frameBorder="0"
                scrolling="no"
                title={giveaway.title}
            /> */}
        </main>
    )
}

export default GiveawayDetail