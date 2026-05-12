import '../styles/lyrics.css'

import Cropper from 'react-easy-crop';
import Nav from "../components/Nav"
import { Helmet } from "react-helmet-async";
import * as htmlToImage from 'html-to-image'
import { LuImagePlus } from "react-icons/lu";
import { useRef,useEffect, useState, useCallback } from 'react';

function Lyrics () {

    const mainContainer = useRef()
    const lyricCard = useRef()
    
    const [ratio, setRatio] = useState("twitterPost") // The size template to use
    const [cardY, setCardY] = useState(0) // dynamic height of the lyric card

    const ratios = {
        twitterPost: { title: "Twitter Post", w: 16, h: 9, th: 25},
        instagramPost: { title: "Instagram Post", w: 4, h: 5, th: 15 },
        facebookPost: { title: "Facebook Post", w: 1, h: 1, th: 25 },
    };

    // react easy crop variables
    const [cropModalOpen, setCropModalOpen] = useState(false)
    const [rawImage, setRawImage] = useState(null)       // raw data URL before cropping
    const [rawImageName, setRawImageName] = useState("") // original file name

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const [cardImg, setCardImg] = useState(null)

    const [albumArt, setAlbumArt] = useState(null)

    const [artistTitle, setArtistTitle] = useState("Artist Title")
    const [songTitle, setSongTitle] = useState("Song Title")
    
    const [cardLyrics, setCardLyrics] = useState("Lyrics go here...")
    
    useEffect(() => {
        const rootElement = mainContainer.current.parentElement
        rootElement.classList.add('lyrics')

        requestAnimationFrame(() => {
            updateRatio("twitterPost");
        });
    }, [])

    useEffect(() => {
        const handleResize = () => updateRatio(ratio);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [ratio]);

    const updateRatio = (ratioKey) => {
        if (!lyricCard.current) return;

        const r = ratios[ratioKey]
        const cardX = lyricCard.current.offsetWidth;

        setCardY(cardX * (r.h/r.w))
        setRatio(ratioKey)
    }
    
    // Called by Cropper continuously as user moves/zooms
    const onCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels)
    }, [])

    // Fired when user picks a file
    const onFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setRawImageName(file.name)

        const reader = new FileReader()
        reader.onload = () => {
            setRawImage(reader.result)
            setCropModalOpen(true)
        }
        reader.readAsDataURL(file)

        // reset input so re-uploading same file still triggers onChange
        e.target.value = ""
    }

    // Draws the cropped region onto a canvas and resolves a data URL
    const getCroppedImg = (imageSrc, pixelCrop) => {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.crossOrigin = "anonymous"
            image.src = imageSrc
            image.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = pixelCrop.width
                canvas.height = pixelCrop.height
                const ctx = canvas.getContext('2d')

                ctx.drawImage(
                    image,
                    pixelCrop.x, pixelCrop.y,
                    pixelCrop.width, pixelCrop.height,
                    0, 0,
                    pixelCrop.width, pixelCrop.height
                )

                resolve(canvas.toDataURL('image/jpeg'))
            }
            image.onerror = reject
        })
    }

    // Called when user confirms crop
    const confirmCrop = async () => {
        try {
            const croppedDataUrl = await getCroppedImg(rawImage, croppedAreaPixels)
            setCardImg({ src: croppedDataUrl, name: rawImageName })
            setCropModalOpen(false)
            setRawImage(null)
        } catch (err) {
            console.error("Crop failed:", err)
        }
    }

    // Called when user cancels
    const cancelCrop = () => {
        setCropModalOpen(false)
        setRawImage(null)
    }

    const exportCard = async () => {
        if (!lyricCard.current) return;

        try {

            const dataUrl = await htmlToImage.toPng(
                lyricCard.current,
                {
                    cacheBust: true,
                    pixelRatio: 2,
                }
            );

            // sanitize filename
            const safeArtist = artistTitle
                .replace(/[^\w\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-");

            const safeSong = songTitle
                .replace(/[^\w\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-");

            const filename = `${safeArtist}-${safeSong}.png`;

            // create temporary download link
            const link = document.createElement("a");

            link.href = dataUrl;
            link.download = filename;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

        } catch (err) {
            console.error("Export failed:", err);
        }
    };

    return (
        <>
            <Helmet>
                <title>Lyric Cards - XStreamer Music</title>
                <meta name="description" content="Build your own lyric cards for instagram, twitter and many more" />
            </Helmet>
            <Nav />
            <main ref={mainContainer} className='lyrics'>
                <header>
                    <h1 className="site-heading">
                        Lyric Cards
                    </h1>

                    <select
                        value={ratio}  
                        className='site-input'         // ← important for controlled component
                        onChange={(e) => updateRatio(e.target.value)}
                    >
                        {Object.entries(ratios).map(([key, ratioOption], i) => (
                            <option value={key} key={i}>
                                {ratioOption.title}
                            </option>
                        ))}
                    </select>
                </header>
                <div id="main-content">
                    <div className="lyric-card-container">
                        <div className={`lyric-card ${ratio}`} ref={lyricCard} style={{ height: `${cardY}px` }}>
                            <div className="lyric-img">
                                <div className="card-lyrics">
                                    {cardLyrics.split('\n').map((line, i) => (
                                        <span key={i} className='card-lyric'>{line}</span>
                                    ))}
                                </div>
                                {cardImg && (
                                    <img
                                        src={cardImg.src}
                                        alt=""
                                        crossOrigin="anonymous"
                                    />
                                )}
                            </div>
                            <div className="title-bar">
                                {albumArt && 
                                    <div className="album-art">
                                        
                                    </div>
                                }
                                <div className="details">
                                    <h2 id='artist-title'>
                                        {artistTitle}
                                    </h2>
                                    <p id='song-title'>{songTitle}</p>
                                </div>
                                <div className="card-watermark">
                                    <img
                                        src="/brand/logo.svg"
                                        className='card-watermark'
                                        alt="XStreamer Music official logo - white against transparent background"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="card-builder">
                        <div className="card-bg-wrapper site-input">
                            <h2 className="site-heading">Card Background</h2>

                            <>
                                <label htmlFor="card-bg">
                                    <LuImagePlus />
                                    {cardImg ? "Replace Image" : "Upload an Image"}
                                </label>

                                <input
                                    type="file"
                                    id='card-bg'
                                    name="card-bg"
                                    onChange={onFileChange}
                                />

                                {cardImg && (
                                    <p className="site-p">
                                        {cardImg.name}
                                    </p>
                                )}
                            </>
                                
                        </div>
                        <div className="site-input card-lyrics">
                            <h2 htmlFor="card-lyrics" className="site-heading">
                                Lyrics
                            </h2>
                            <textarea
                                onChange={(e) => {setCardLyrics(e.target.value)}}
                                placeholder={cardLyrics}
                                id="card-lyrics" />
                        </div>
                        <div className="detail-input">
                            <h2 className="site-heading">Card Details</h2>
                            <div className="input-block">
                                <input 
                                    type="text"
                                    name="artistTitle"
                                    id="artistTitle"
                                    
                                    onChange={(e) => {setArtistTitle(e.target.value)}}
                                    placeholder='Artist Title'/>
                                <input 
                                    type="text"
                                    name="songTitle"
                                    id="songTitle"
                                    
                                    onChange={(e) => {setSongTitle(e.target.value)}}
                                    placeholder='Song Title'/>
                            </div>
                        </div>
                        <div className="action-bar">
                            <button onClick={exportCard} className='site-btn'>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {cropModalOpen && (
                <div className="crop-modal">
                    <div className="crop-container">
                        <Cropper
                            image={rawImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={
                                (ratios[ratio].w) /
                                (ratios[ratio].h * (1 - ratios[ratio].th / 100))
                            }
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className="crop-controls">
                        <div className="control-block zoom">
                            <label>
                                Zoom
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.01}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                            />
                        </div>
                        <div className="control-block crop">
                            <button onClick={cancelCrop} className="site-btn">Cancel</button>
                            <button onClick={confirmCrop} className="site-btn">Crop</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Lyrics;