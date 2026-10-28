import React, { useRef, useState } from "react";

export default function SimpleImageTour() {
  const [offset, setOffset] = useState(0);
  const drag = useRef({ x: 0, offset: 0, active: false });
  const viewer = useRef(null);

  const move = (direction) => {
    if (!viewer.current) return;
    const max = viewer.current.clientWidth;
    setOffset((prev) =>
      Math.max(-max, Math.min(0, prev + direction * 60))
    );
  };

  const startDrag = (e) => {
    drag.current = {
      x: e.clientX,
      offset,
      active: true,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const dragImage = (e) => {
    if (!drag.current.active || !viewer.current) return;
    const max = viewer.current.clientWidth;
    const next = drag.current.offset + e.clientX - drag.current.x;
    setOffset(Math.max(-max, Math.min(0, next)));
  };

  const stopDrag = () => {
    drag.current.active = false;
  };

  return (
    <div style={{ maxWidth: 900, margin: "30px auto", padding: 16 }}>
      <h2 style={{ textAlign: "center" }}>Virtual Image Tour</h2>

      <div
        ref={viewer}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(-1);
          }
        }}
        onPointerDown={startDrag}
        onPointerMove={dragImage}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={stopDrag}
        style={{
          width: "100%",
          height: 450,
          overflow: "hidden",
          position: "relative",
          background: "#222",
          cursor: "grab",
          touchAction: "pan-y",
          outline: "none",
        }}
      >
        <img
          src="/images/taj-mahal-0.jpg"
          alt="Taj Mahal"
          draggable="false"
          style={{
            width: "200%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: `translateX(${offset}px)`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginTop: 16,
        }}
      >
        <button onClick={() => move(1)} style={buttonStyle}>
          ← Left
        </button>
        <button onClick={() => move(-1)} style={buttonStyle}>
          Right →
        </button>
      </div>

      <p style={{ textAlign: "center", color: "#666" }}>
        Drag the image, swipe on mobile, or use the arrow keys.
      </p>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 22px",
  fontSize: 16,
  cursor: "pointer",
};