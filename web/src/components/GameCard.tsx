import Link from "next/link";
import type { AppLocale } from "@/content/locales";
import { cn } from "@/lib/cn";
import { getLocalizedGameName, type SeedGame } from "@/content/seed";
import { SafeImage } from "./SafeImage";

export function GameCard({
  game,
  locale,
  href,
  imageUrl,
  className,
}: {
  game: SeedGame;
  locale: AppLocale;
  href: string;
  /** Local path only (from manifest or placeholder). No external URLs. */
  imageUrl: string;
  className?: string;
}) {
  const title = getLocalizedGameName(game, locale);
  const img = imageUrl;

  return (
    <Link
      href={href}
      className={cn(
        "group rounded-2xl border border-black/5 bg-white p-4 transition-colors hover:border-black/10",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-zinc-100">
          {img ? (
            <SafeImage
              alt={title}
              src={img}
              fill
              sizes="56px"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-zinc-600">
              {title.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold tracking-tight text-zinc-950">
            {title}
          </div>
          <div className="mt-1 truncate text-xs text-zinc-600">
            {game.relationship?.label ?? ""}
          </div>
        </div>
        <div className="text-xs font-medium text-zinc-600 group-hover:text-zinc-950">
          →
        </div>
      </div>
    </Link>
  );
}

