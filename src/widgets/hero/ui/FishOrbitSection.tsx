const ORBITS = [
  {
    size: 240,
    duration: 36,
    clockwise: true,
    icons: [
      { src: "/Fishicons/food-prawn-sea-svgrepo-com.svg", label: "Креветка" },
      { src: "/Fishicons/food-lobster-sea-svgrepo-com.svg", label: "Омар" },
      { src: "/Fishicons/food-sea-squid-svgrepo-com.svg", label: "Кальмар" },
    ],
  },
  {
    size: 560,
    duration: 52,
    clockwise: false,
    icons: [
      { src: "/Fishicons/anglerfish-fish-sea-svgrepo-com.svg", label: "Удильщик" },
      { src: "/Fishicons/fish-jellyfish-sea-svgrepo-com.svg", label: "Медуза" },
      { src: "/Fishicons/fish-sea-stingray-svgrepo-com.svg", label: "Скат" },
      { src: "/Fishicons/beach-sea-starfish-svgrepo-com.svg", label: "Морская звезда" },
      { src: "/Fishicons/clam-food-sea-svgrepo-com.svg", label: "Моллюск" },
    ],
  },
];

const ICON_SIZE = 44;

export function FishOrbitSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 py-8">
      {/* Subtle background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-100/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 min-h-[420px]">

          {/* Text left */}
          <div className="flex-1 text-center lg:text-left z-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Новости отрасли
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Актуальные события<br />
              рыбного рынка России
            </h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-md">
              Цены, промысел, аквакультура, регуляторика — ежедневные обзоры для профессионалов рыбной отрасли.
            </p>
            <a
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              Читать новости →
            </a>
          </div>

          {/* Orbit animation right */}
          <div className="relative flex-shrink-0 w-[620px] h-[620px] flex items-center justify-center" aria-hidden="true">
            {ORBITS.map((orbit, oi) => (
              <div
                key={oi}
                className="absolute rounded-full border border-dashed border-primary/20"
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
                        className="flex items-center justify-center"
                        style={{
                          width: ICON_SIZE,
                          height: ICON_SIZE,
                          marginTop: -ICON_SIZE / 2,
                          animation: `orbit-${counterDir} ${orbit.duration}s linear infinite`,
                          filter: "drop-shadow(0 0 8px rgba(14, 165, 233, 0.6))",
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

            {/* Center */}
            <div className="relative z-10 w-20 h-20 flex items-center justify-center">
              <img
                src="/Fishicons/fish-food-sea-svgrepo-com.svg"
                alt="Рыба"
                width={44}
                height={44}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
