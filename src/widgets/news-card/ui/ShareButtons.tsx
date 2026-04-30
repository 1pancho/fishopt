"use client";

type Props = {
  title: string;
};

export function ShareButtons({ title }: Props) {
  const share = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title, url: window.location.href });
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Поделиться:</span>
      <button
        type="button"
        onClick={share}
        className="px-3 py-1.5 rounded-lg border border-border text-sm hover:bg-secondary transition-colors"
      >
        Telegram
      </button>
      <button
        type="button"
        onClick={share}
        className="px-3 py-1.5 rounded-lg border border-border text-sm hover:bg-secondary transition-colors"
      >
        VK
      </button>
    </div>
  );
}
