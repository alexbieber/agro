/**
 * Site configuration. Prefer environment variables for deployment.
 * Set these in .env.local (dev) or your host's env (production).
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919XXXXXXXXX";

/** Number for order/purchase enquiries – customer details are sent here. */
export const ORDER_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_ORDER_WHATSAPP_NUMBER ?? "919798893573";
export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Nandee Agrotech";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nandiagrotech.com";
export const SITE_TAGLINE =
  process.env.NEXT_PUBLIC_SITE_TAGLINE ??
  "Your one-stop destination for high-quality agricultural equipment. Modern technology at affordable prices.";

/** Optional support/landline number shown on bulk orders etc. Leave unset to hide. */
export const SUPPORT_PHONE = process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "";

/** Nandee Agrotech YouTube channel – videos and demos. */
export const YOUTUBE_CHANNEL_URL =
  process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ??
  "https://www.youtube.com/channel/UCf5BtTEmy7osf-n4yP_LSrg";
