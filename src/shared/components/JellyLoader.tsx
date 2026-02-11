"use client";

import React from "react";

interface JellyLoaderProps {
  /** Size in px (default 40) */
  size?: number;
  /** Dot colour – defaults to white so it works on dark buttons */
  color?: string;
  /** Animation cycle in seconds (default 0.8) */
  speed?: number;
}

/**
 * Jelly-ooze loading indicator.
 * Completely self-contained: CSS + inline SVG filter.
 */
export default function JellyLoader({
  size = 40,
  color = "#ffffff",
  speed = 0.8,
}: JellyLoaderProps) {
  const id = React.useId().replace(/:/g, "");
  const filterId = `jelly-ooze-${id}`;

  return (
    <>
      {/* Inline SVG filter — one per instance so concurrent loaders work */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="6.25"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>

      <div
        aria-label="Cargando…"
        role="status"
        className="jelly-loader"
        style={
          {
            "--jl-size": `${size}px`,
            "--jl-speed": `${speed}s`,
            "--jl-color": color,
            filter: `url('#${filterId}')`,
          } as React.CSSProperties
        }
      />

      {/* Scoped styles — injected once via <style> */}
      <style>{`
        .jelly-loader {
          position: relative;
          height: calc(var(--jl-size) / 2);
          width: var(--jl-size);
          animation: jl-rotate calc(var(--jl-speed) * 2) linear infinite;
        }
        .jelly-loader::before,
        .jelly-loader::after {
          content: '';
          position: absolute;
          top: 0;
          left: 25%;
          width: 50%;
          height: 100%;
          background: var(--jl-color);
          border-radius: 100%;
        }
        .jelly-loader::before {
          animation: jl-left var(--jl-speed) ease infinite;
        }
        .jelly-loader::after {
          animation: jl-right var(--jl-speed) ease infinite;
        }
        @keyframes jl-rotate {
          0%, 49.999%, 100% { transform: none; }
          50%, 99.999% { transform: rotate(90deg); }
        }
        @keyframes jl-left {
          0%, 100% { transform: translateX(0%); }
          50% { transform: scale(0.65) translateX(-75%); }
        }
        @keyframes jl-right {
          0%, 100% { transform: translateX(0%); }
          50% { transform: scale(0.65) translateX(75%); }
        }
      `}</style>
    </>
  );
}
