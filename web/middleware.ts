import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/content/locales";

const PUBLIC_FILE = /\.(.*)$/;

const CHAT_HOSTS = new Set(
  ["chat.bytedance.games", "chat.localhost"].concat(
    (process.env.CHAT_SUBDOMAIN_HOSTS || "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean),
  ),
);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host")?.split(":")[0] ?? "";

  // Skip next internals and static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // chat.bytedance.games → Toxee landing (/chat)
  if (CHAT_HOSTS.has(host) && (pathname === "/" || pathname === "")) {
    const url = req.nextUrl.clone();
    url.pathname = "/chat";
    return NextResponse.rewrite(url);
  }

  // Standalone /chat route (no locale prefix)
  if (pathname === "/chat" || pathname.startsWith("/chat/")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const hasLocale = (SUPPORTED_LOCALES as readonly string[]).includes(maybeLocale);

  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

