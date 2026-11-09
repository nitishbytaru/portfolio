"use client";

import React, { useEffect, useState } from "react";

export default function Odometer({ value }: { value: number }) {
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRolled(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span className="inline-flex" aria-label={String(value)}>
      {String(value).split("").map((digit, place) => (
        <span key={place} aria-hidden="true" className="block h-[1em] overflow-hidden">
          <span
            className="block motion-safe:transition-transform motion-safe:duration-[1400ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateY(-${rolled ? Number(digit) : 0}em)`, transitionDelay: `${place * 120}ms` }}
          >
            {Array.from({ length: 10 }, (_, n) => <span key={n} className="block h-[1em] leading-none">{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}
