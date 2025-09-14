import './PreviewCard.css'
import { useContext, useEffect, useRef, useState } from "react";
import { CardContext } from "../CardContext";
import * as htmlToImage from 'html-to-image';

function PreviewCard() {
  const { ratioSize, ratioId, ratios} = useContext(CardContext);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Text overlay state
  const [artist, setArtist] = useState("Artist Name");
  const [songTitle, setSongTitle] = useState("song title...");
  const selectedRatio = ratios.find(r => r.id === ratioId) || { width: 1600, height: 900 };

  useEffect(() => {
    if (!containerRef.current) return;

    const resize = () => {
      const pxWidth = containerRef.current.offsetWidth;
      const newHeight = pxWidth * (ratioSize.height / ratioSize.width);
      setHeight(newHeight);
    };

    resize(); // initial calculation
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [ratioSize]);

  const handleDownload = () => {
    if (!containerRef.current) return;

    const scaleX = selectedRatio.width / containerRef.current.offsetWidth;
    const scaleY = selectedRatio.height / containerRef.current.offsetHeight;
    const scale = Math.min(scaleX, scaleY);

    const style = {
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      width: `${selectedRatio.width}px`,
      height: `${selectedRatio.height}px`
    };

    htmlToImage.toPng(containerRef.current, {
      width: selectedRatio.width,
      height: selectedRatio.height,
      style,
      cacheBust: true
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'lyric-card.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to generate image:', err);
      });
  };


  return (
    <section id="preview">
      <h2>Preview</h2>
      <div
        ref={containerRef}
        className="preview-card"
        style={{ height: `${height}px` }}
      >
        <div className="background">
          <span className="album-art"></span>
        </div>

        <div className="text-overlay">
          <input
            type="text"
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="overlay-input artist"
          />
          <input
            type="text"
            placeholder="Song Title"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            className="overlay-input track"
          />
        </div>
      </div>

      <button onClick={handleDownload} className="download-btn">
        Download Card
      </button>
    </section>
  );
}

export default PreviewCard;

