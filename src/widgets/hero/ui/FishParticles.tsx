"use client";

const PARTICLES = [
  { emoji: "🐟", x: 8,  delay: 0,  duration: 18, size: 18, opacity: 0.12 },
  { emoji: "🐠", x: 22, delay: 4,  duration: 22, size: 14, opacity: 0.10 },
  { emoji: "🦐", x: 38, delay: 1,  duration: 15, size: 13, opacity: 0.09 },
  { emoji: "🐡", x: 52, delay: 6,  duration: 20, size: 16, opacity: 0.11 },
  { emoji: "🦀", x: 67, delay: 2,  duration: 25, size: 17, opacity: 0.09 },
  { emoji: "🐟", x: 80, delay: 8,  duration: 17, size: 12, opacity: 0.10 },
  { emoji: "🦑", x: 91, delay: 3,  duration: 21, size: 15, opacity: 0.08 },
  { emoji: "🐠", x: 15, delay: 10, duration: 19, size: 11, opacity: 0.08 },
];

export function FishParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute select-none fish-float"
          style={{
            left: `${p.x}%`,
            bottom: "-5%",
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
