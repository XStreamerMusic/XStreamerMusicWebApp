import api from '../api/api'
import Nav from '../components/Nav';

import { useState, useRef, useEffect } from 'react';
import '../styles/waitlist.css';
import { Helmet } from 'react-helmet-async'
import loader from '../assets/icons/loader.gif'
import Marquee from "react-fast-marquee";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Waitlist () {
    
    const [messages, setMessages] = useState([])
    const [sending, setSending] = useState(false)
    const [waitlistEmail, setWaitlistEmail] = useState("")
    
    const mainContainer = useRef()
    const messageElement = useRef()
    
    useEffect(() => {
        if (messages) {
            messageElement.current.classList.toggle('invisible')
            setTimeout(() => {
                messageElement.current.classList.toggle('invisible')
            }, 5000)
        }
    }, [messages])
    
    useEffect(() => {
        const rootElement = mainContainer.current.parentElement
        rootElement.classList.add('waitlist')
    }, [])

    const joinWaitlist = async (e) => {
        
        e.preventDefault()

        if (!sending) {

            setSending(prev => !prev)
            
            const formData = new FormData();
            formData.append("email", waitlistEmail);
            
            try {
                const response = await api.post("/api/join_waitlist/", formData);
                console.log(response);
                setMessages(prev => [...prev, response.data.message]);
                setWaitlistEmail("");
            } catch (error) {
                console.log(error);
                const status = error.response?.status || "Network Error";
                setMessages(prev => [...prev, `Error: ${status}`]);
            }
            
            setSending(prev => !prev)
        }   
    }

    return (
        <>
            <Helmet>
                <title>"Join The New Wave - XStreamer Music"</title>
                <meta name="description" content="South African music is booming, and the beat is about to DROP. Join our waitlist, and we'll notify you when the site is up and running" />
            </Helmet>
            <Nav />
            <main ref={mainContainer} className='waitlist'>
                <h1 className='site-heading'>
                    The Drop Is Here<br />
                    <span>Join The New Wave</span>
                </h1>

                <p className='site-p'>
                    <span>
                        SA Music is experiencing a cultural BOOM,<br />and
                        you DON'T wanna miss out!
                        <br /><br />
                    </span>

                    <b>Join The Waitlist,</b><br />
                    and we'll give you a
                    shout when the site is up and running!
                </p>

                <form id="waitlist" onSubmit={joinWaitlist}>
                    <label htmlFor="id_email" className="visually-hidden">
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        id="id_email"
                        value={waitlistEmail}
                        placeholder="Enter your email address"
                        required
                        onChange={(e) => {setWaitlistEmail(e.target.value)}}
                    />

                    <button type="submit" id="waitlist-submit">

                        {sending ?
                            <img src={loader} alt="" className='btn-icon' />
                            :
                            <ion-icon name="arrow-forward"></ion-icon>
                        }
                        <img
                            src={loader}
                            alt=""
                            style={{ display: 'none' }}
                            aria-hidden="true"
                        />
                    </button>
                </form>

                <div className="page-logo">
                    <svg
                        viewBox="0 0 567 572"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M282.435 285.706L110.726 398.359V502.763"
                            stroke="white"
                            strokeWidth="100"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M283.685 285.706L455.394 173.053V68.6488"
                            stroke="white"
                            strokeWidth="100"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M283.746 285.706L455.455 398.359V501.573"
                            stroke="white"
                            strokeWidth="100"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M282.435 285.706L110.726 173.053V69.8393"
                            stroke="white"
                            strokeWidth="100"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M114.628 568.903C112.537 570.403 109.723 570.403 107.633 568.903L30.0474 513.242C25.3098 509.843 27.7143 502.366 33.545 502.366H188.716C194.547 502.366 196.951 509.843 192.213 513.242L114.628 568.903Z"
                            fill="white"
                        />
                        <path
                            d="M451.493 2.5092C453.583 1.00942 456.397 1.00942 458.488 2.5092L536.073 58.1705C540.811 61.5693 538.406 69.0456 532.576 69.0456H377.405C371.574 69.0456 369.17 61.5693 373.907 58.1705L451.493 2.5092Z"
                            fill="white"
                        />
                    </svg>
                </div>

                <div className="gradient-backdrop"></div>

            </main>
            <ul className="messages invisible" ref={messageElement}>
                <ion-icon className="main-icon" name="notifications"></ion-icon>
                {messages.map((message, i) => (
                    <li key={i}>{message}</li>
                ))}
            
            </ul>
        </>
    )
}

export default Waitlist