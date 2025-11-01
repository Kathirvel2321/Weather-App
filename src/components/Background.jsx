import React, { useRef, useEffect } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function setupCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      dots.length = 0;
      for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
          dots.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0 });
        }
      }
    }

    const spacing = 22;
    const dots = [];
    const mouse = { x: -9999, y: -9999 };
    const radius = 130;

    setupCanvas(); // initial grid

    function handleResize() {
      setupCanvas();
    }

    window.addEventListener("resize", handleResize);

    // ✅ animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const force = (radius - dist) / radius;
          dot.vx -= (dx / dist) * force * 2;
          dot.vy -= (dy / dist) * force * 2;
        }

        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.vx *= 0.9;
        dot.vy *= 0.9;
        dot.x += (dot.baseX - dot.x) * 0.04;
        dot.y += (dot.baseY - dot.y) * 0.04;

        ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
        ctx.fillRect(dot.x, dot.y, 2, 2);
      });

      requestAnimationFrame(animate);
    }

    animate();

    // ✅ mouse tracking
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "transparent",
        margin: 0,
        padding: 0,
        opacity: "0.2",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
