"use client";

const ORBITS = [
  {
    size: 230,
    duration: 22,
    clockwise: true,
    icons: [
      { src: "/Fishicons/fish-food-salmon-svgrepo-com.svg", label: "Лосось" },
      { src: "/Fishicons/crab-food-sea-svgrepo-com.svg", label: "Краб" },
      { src: "/Fishicons/clown-clownfish-fish-svgrepo-com.svg", label: "Рыба" },
    ],
  },
  {
    size: 390,
    duration: 36,
    clockwise: false,
    icons: [
      { src: "/Fishicons/food-prawn-sea-svgrepo-com.svg", label: "Креветка" },
      { src: "/Fishicons/food-sea-squid-svgrepo-com.svg", label: "Кальмар" },
      { src: "/Fishicons/food-lobster-sea-svgrepo-com.svg", label: "Омар" },
      { src: "/Fishicons/fish-puffer-sea-svgrepo-com.svg", label: "Рыба-шар" },
    ],
  },
  {
    size: 550,
    duration: 52,
    clockwise: true,
    icons: [
      { src: "/Fishicons/anglerfish-fish-sea-svgrepo-com.svg", label: "Удильщик" },
      { src: "/Fishicons/fish-jellyfish-sea-svgrepo-com.svg", label: "Медуза" },
      { src: "/Fishicons/fish-sea-stingray-svgrepo-com.svg", label: "Скат" },
      { src: "/Fishicons/beach-sea-starfish-svgrepo-com.svg", label: "Морская звезда" },
      { src: "/Fishicons/clam-food-sea-svgrepo-com.svg", label: "Моллюск" },
    ],
  },
];

const ICON_SIZE = 48;

export function OrbitingIcons() {
  return (
    <div
      className="absolute top-0 bottom-0 right-0 w-[640px] hidden xl:flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {ORBITS.map((orbit, oi) => (
        <div
          key={oi}
          className="absolute rounded-full border border-dashed border-white/20"
          style={{
            width: orbit.size,
            height: orbit.size,
            animation: `orbit-${orbit.clockwise ? "cw" : "ccw"} ${orbit.duration}s linear infinite`,
          }}
        >
          {orbit.icons.map((icon, ii) => {
            const angle = (360 / orbit.icons.length) * ii;
            const counterDir = orbit.clockwise ? "ccw" : "cw";
            return (
              <div
                key={ii}
                className="absolute inset-0 flex items-start justify-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className="rounded-full bg-white/90 backdrop-blur-sm border border-white/40 shadow-lg flex items-center justify-center"
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    marginTop: -ICON_SIZE / 2,
                    animation: `orbit-${counterDir} ${orbit.duration}s linear infinite`,
                  }}
                  title={icon.label}
                >
                  <img
                    src={icon.src}
                    alt={icon.label}
                    width={28}
                    height={28}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Center icon */}
      <div className="relative z-10 w-20 h-20 rounded-full bg-white/90 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-xl">
        <img
          src="/Fishicons/fish-food-sea-svgrepo-com.svg"
          alt="Рыба"
          width={44}
          height={44}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
