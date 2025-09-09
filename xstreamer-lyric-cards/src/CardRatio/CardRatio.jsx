import './CardRatio.css';
import { useState, useEffect, useRef } from "react";

function CardRatio() {

    const [ratio, setRatio] = useState("square");

    const ratios = [
        {id: "instagram", width: 1080, height: 1350 },
        {id: "twitter", width: 1600, height: 900 },
        {id: "square", width: 1080, height: 1080 },
    ]

    function rescale(width, height, maxWidthRem, base = 16) {
        const maxWidthPx = maxWidthRem * base;
        const scale = maxWidthPx / width;

        return {
            width: maxWidthRem,
            height: (height * scale) / base
        };
    }

    const ratioButtons = ratios.map((ratioButton) => {
        const { width, height } = rescale(ratioButton.width, ratioButton.height, 3);

        return (
            <button
                key={ratioButton.id}
                className={`ratio-button ${ratio === ratioButton.id ? "active" : ""}`}
                onClick={() => setRatio(ratioButton.id)}
            >
                <span
                className="visual"
                style={{ width: `${width}rem`, height: `${height}rem` }}
                />
                {ratioButton.id}
                <span className="aspect">
                {`${ratioButton.width}x${ratioButton.height}`}
                </span>
            </button>
            );
    });

    return (
        <section id="ratios">
            <h2>Pick a ratio</h2>
            <span>This is the size your lyric card will be...</span>
            <div className='container'>
                {ratioButtons}
            </div>
        </section>
    )
}

export default CardRatio;