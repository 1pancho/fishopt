"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "рыбы и морепродуктов",
  "лосося и красной икры",
  "краба и гребешка",
  "трески и палтуса",
  "горбуши и кеты",
  "креветки и кальмара",
];

export function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const word = WORDS[wordIndex];

    const delay = isDeleting ? 40 : displayed.length === word.length ? 2200 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < word.length) {
          setDisplayed(word.slice(0, displayed.length + 1));
        } else {
          setIsPaused(true);
          setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 2200);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % WORDS.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, isPaused, wordIndex]);

  return (
    <span className="gradient-text-anim">
      {displayed}
      <span
        className="inline-block w-0.5 h-8 md:h-10 bg-[#38bdf8] ml-1 align-middle"
        style={{ animation: "cursor-blink 0.9s step-end infinite" }}
        aria-hidden="true"
      />
    </span>
  );
}
