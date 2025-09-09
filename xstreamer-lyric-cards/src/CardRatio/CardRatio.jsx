import './CardRatio.css';
import { CardContext } from '../CardContext';
import { useContext } from 'react';
import { rescale } from "../utils/rescale";

function CardRatio() {
  const { ratioId, updateRatio } = useContext(CardContext);

  const ratios = [
    { id: "instagram", width: 1080, height: 1350 },
    { id: "twitter", width: 1600, height: 900 },
    { id: "square", width: 1080, height: 1080 },
  ];

  return (
    <section id="ratios">
      <h2>Pick a ratio</h2>
      <span>This is the size your lyric card will be...</span>
      <div className='container'>
        {ratios.map((r) => {
          const { width: visualWidth, height: visualHeight } = rescale(r.width, r.height, 3);

          return (
            <button
              key={r.id}
              className={`ratio-button ${ratioId === r.id ? "active" : ""}`}
              onClick={() => updateRatio(r.id, r.width, r.height)}
            >
              <span
                className="visual"
                style={{
                  width: `${visualWidth}rem`,
                  height: `${visualHeight}rem`
                }}
              />
              {r.id}
              <span className="aspect">
                {`${r.width}x${r.height}`}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CardRatio;
