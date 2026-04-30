"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  { icon: "🏢", text: "3 компании зарегистрировались сегодня" },
  { icon: "📋", text: "47 прайс-листов обновлено за сутки" },
  { icon: "📣", text: "12 новых объявлений за час" },
  { icon: "🤝", text: "8 запросов на поставку сейчас" },
  { icon: "🐟", text: "Горбуша — 185 ₽/кг · новый прайс" },
];

export function LiveActivityWidget() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const msg = MESSAGES[index];

  return (
    <div
      className="absolute bottom-24 right-4 md:right-8 z-10 hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs max-w-[230px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
      aria-live="polite"
    >
      <span className="relative flex w-2 h-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
      </span>
      <span>{msg.icon} {msg.text}</span>
    </div>
  );
}
