"use client";

export function NewsSubscribeForm() {
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="email@example.ru"
        className="px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
      />
      <button
        type="submit"
        className="py-2.5 rounded-lg bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-colors"
      >
        Подписаться
      </button>
    </form>
  );
}
