import { NextResponse, NextRequest } from "next/server";
import type { NextRequest as NextRequestType } from "next/server";

/**
 * Middleware function to handle request headers
 * Adds custom headers with URL information to the request
 * @param request - The incoming request object
 * @returns NextResponse with modified headers
 */

const locales = [
  "ar",
  "ce",
  "cy",
  "de",
  "diq",
  "en",
  "es",
  "fr",
  "gl",
  "he",
  "id",
  "ja",
  "kaa",
  "ko",
  "lb",
  "lt",
  "mk",
  "nl",
  "pms",
  "pt-br",
  "pt",
  "qqq",
  "ru",
  "sh-cyrl",
  "sh-latn",
  "sh-cyrl",
  "sh-latn",
  "sk",
  "skr-arab",
  "sl",
  "sq",
  "sv",
  "tr",
  "zh-hans",
  "zh-hant",
];
const defaultLocale = "en";

function getLocale(request: NextRequestType): string {
  // Try to get the locale from the cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Try to get the locale from the accept-language header
  const acceptLanguage = request.headers.get("accept-language")?.split(",")[0];
  if (acceptLanguage && locales.includes(acceptLanguage)) {
    return acceptLanguage;
  }

  // Default to the default locale
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Check if is already a locale in the url
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
