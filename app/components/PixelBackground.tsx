"use client";

import React, { useEffect, useRef } from "react";

interface FloatingItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  type: "banana" | "brinjal" | "sparklePink" | "sparkleYellow";
  opacity: number;
}

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate floating items
    const count = Math.min(Math.floor((width * height) / 35000), 45) + 20;
    const items: FloatingItem[] = [];

    const types: FloatingItem["type"][] = [
      "banana",
      "brinjal",
      "banana",
      "brinjal",
      "sparklePink",
      "sparkleYellow",
    ];

    for (let i = 0; i < count; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.3 - Math.random() * 0.4, // gently drifting upwards
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015,
        size: Math.random() > 0.4 ? (Math.random() * 16 + 26) : (Math.random() * 8 + 8),
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.4 + 0.5,
      });
    }

    // Draw pixel banana
    function drawPixelBanana(c: CanvasRenderingContext2D, size: number) {
      const p = size / 16;
      c.fillStyle = "#2d1300"; // dark outline
      c.fillRect(-6 * p, -2 * p, 3 * p, 3 * p);
      c.fillRect(-4 * p, -4 * p, 4 * p, 3 * p);
      c.fillRect(0 * p, -5 * p, 4 * p, 3 * p);
      c.fillRect(3 * p, -6 * p, 4 * p, 3 * p);

      // Yellow body
      c.fillStyle = "#ffe033";
      c.fillRect(-5 * p, -1 * p, 3 * p, 3 * p);
      c.fillRect(-2 * p, -3 * p, 4 * p, 3 * p);
      c.fillRect(1 * p, -4 * p, 4 * p, 3 * p);
      c.fillRect(4 * p, -5 * p, 3 * p, 2 * p);

      // Highlight
      c.fillStyle = "#fff566";
      c.fillRect(-1 * p, -2 * p, 3 * p, 2 * p);
      c.fillRect(2 * p, -4 * p, 2 * p, 2 * p);

      // Stem green
      c.fillStyle = "#5ea926";
      c.fillRect(6 * p, -7 * p, 2 * p, 2 * p);
    }

    // Draw pixel brinjal (eggplant)
    function drawPixelBrinjal(c: CanvasRenderingContext2D, size: number) {
      const p = size / 16;
      // Outline
      c.fillStyle = "#1b0826";
      c.fillRect(-5 * p, -4 * p, 10 * p, 10 * p);
      c.fillRect(-4 * p, 5 * p, 8 * p, 2 * p);

      // Purple flesh
      c.fillStyle = "#7b1fa2";
      c.fillRect(-4 * p, -3 * p, 8 * p, 8 * p);
      c.fillRect(-3 * p, 4 * p, 6 * p, 2 * p);

      // Lavender highlight
      c.fillStyle = "#ce93d8";
      c.fillRect(-3 * p, -2 * p, 3 * p, 4 * p);
      c.fillStyle = "#f3e5f5";
      c.fillRect(-2 * p, -1 * p, 2 * p, 2 * p);

      // Green stem & crown
      c.fillStyle = "#4caf50";
      c.fillRect(-1 * p, -7 * p, 2 * p, 4 * p);
      c.fillRect(-4 * p, -5 * p, 8 * p, 2 * p);
    }

    // Draw pixel sparkle cross (+)
    function drawPixelSparkle(c: CanvasRenderingContext2D, size: number, color: string) {
      const p = size / 5;
      c.fillStyle = color;
      c.fillRect(-0.5 * p, -2.5 * p, 1 * p, 5 * p);
      c.fillRect(-2.5 * p, -0.5 * p, 5 * p, 1 * p);
      c.fillStyle = "#ffffff";
      c.fillRect(-0.5 * p, -0.5 * p, 1 * p, 1 * p);
    }

    // Click interactive burst
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      for (let k = 0; k < 6; k++) {
        const angle = (Math.PI * 2 * k) / 6 + (Math.random() - 0.5);
        const speed = Math.random() * 3 + 2;
        items.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 12 + 24,
          type: Math.random() > 0.5 ? "banana" : "brinjal",
          opacity: 1,
        });
      }
    };

    window.addEventListener("pointerdown", handleClick);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep arcade purple radial glow
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        50,
        width / 2,
        height * 0.45,
        Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, "#3a1754");
      grad.addColorStop(0.5, "#250d3b");
      grad.addColorStop(1, "#12041e");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle pixel grid dots
      ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.fillRect(x, y, 2, 2);
        }
      }

      // Update & Render items
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.x += item.vx;
        item.y += item.vy;
        item.rotation += item.vRot;

        // Wrap around borders
        if (item.y < -50) item.y = height + 40;
        if (item.y > height + 50) item.y = -40;
        if (item.x < -50) item.x = width + 40;
        if (item.x > width + 50) item.x = -40;

        ctx.save();
        ctx.globalAlpha = item.opacity;
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);

        if (item.type === "banana") {
          drawPixelBanana(ctx, item.size);
        } else if (item.type === "brinjal") {
          drawPixelBrinjal(ctx, item.size);
        } else if (item.type === "sparklePink") {
          drawPixelSparkle(ctx, item.size, "#ff70a6");
        } else if (item.type === "sparkleYellow") {
          drawPixelSparkle(ctx, item.size, "#ffd166");
        }

        ctx.restore();
      }

      // Cap burst items to avoid memory bloat
      if (items.length > 80) {
        items.splice(count, items.length - count);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-0 select-none"
      style={{ touchAction: "none" }}
    />
  );
}

