// PreviewCard.jsx
import './PreviewCard.css'
import { useContext, useEffect, useRef, useState } from "react";
import { CardContext } from "../CardContext";

function PreviewCard() {
  const { ratioSize } = useContext(CardContext);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const resize = () => {
      const pxWidth = containerRef.current.offsetWidth;
      const newHeight = pxWidth * (ratioSize.height / ratioSize.width);
      setHeight(newHeight);
    };

    resize(); // run once
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [ratioSize]);

  return (
    <section id="preview">
      <h2>Preview</h2>
      <div
        ref={containerRef}
        className="preview-card"
        style={{
          width: "100%",
          height: `${height}px`,
        }}
      >
        <p className="placeholder">Your lyrics will appear here...</p>
      </div>
    </section>
  );
}

export default PreviewCard