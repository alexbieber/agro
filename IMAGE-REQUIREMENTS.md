# Image requirements — Nandee Agrotech

All places that use images and the dimensions to use for new/improved assets. Current sources: `lib/data/productImages.ts` (Unsplash URLs), fallbacks, and optional local files.

---

## 1. Hero / full-width banners

| Place | File/usage | Recommended size | Aspect | Notes |
|-------|------------|------------------|--------|--------|
| **Hero carousel** (home) | `heroImages.irrigation`, `heroImages.machinery` | **1400×600** or **1920×800** | ~2.3:1 | `HeroSection.tsx`: 3 slides (irrigation, machinery, machinery). Min height 280–340px, `sizes="(max-width: 768px) 100vw, 80vw"`. |
| **Distributor page hero** | `heroImages.machinery` | **1400×600** or **1920×800** | ~2.3:1 | Full-width strip, `sizes="100vw"`. Same asset as hero is fine. |

**Count:** 2 unique images (irrigation, machinery).

---

## 2. Category grid (home)

| Place | File/usage | Recommended size | Aspect | Notes |
|-------|------------|------------------|--------|--------|
| **Shop by category** | `categoryImages.irrigation`, `categoryImages.machinery` | **800×500** or **600×400** | 16:10 or 3:2 | `CategoryGrid.tsx`. Cards min-height 220px; mobile 1 col, desktop 2 col. `sizes="(max-width: 640px) 100vw, 50vw"`. |

**Count:** 2 images (one per category: irrigation, machinery).

---

## 3. Product images

Used in: **ProductCard** (shop/collection), **ImageGallery** (product page main + thumbnails), **Cart** (thumbnails), **Product JSON-LD / OG** (product page).

| Use | Recommended size | Aspect | Notes |
|-----|------------------|--------|--------|
| **Product card & gallery main** | **800×800** or **1000×1000** | 1:1 | Card: `aspect-square`, `sizes="(max-width: 768px) 50vw, 25vw"`. Gallery: `sizes="(max-width: 768px) 100vw, 50vw"`. One image per product is enough for main display. |
| **Gallery thumbnails** | **128×128** (or same as main, Next will resize) | 1:1 | Display 64×64; 2x = 128. |
| **Cart row thumbnail** | **160×160** (or same as main) | 1:1 | Display 80×80; 2x = 160. |
| **OG / JSON-LD** | **1200×630** (optional; for social share) | 1.9:1 | Only if you want a dedicated social image; otherwise product square is used. |

**Count:** One image per product. Current `productImages` has **11** entries (`irr-001`–`irr-005`, `mach-001`–`mach-006`). The rest of the catalog uses fallback or `product.images` (e.g. `/images/products/{slug}.jpg`). For a full set of “new improved” product images, you need **one image per product ID** (all `irr-*` and `mach-*` IDs). See `lib/data/products.ts` for the full list.

---

## 4. Videos section (YouTube)

| Place | Source | Size | Notes |
|-------|--------|------|--------|
| **OurVideos thumbnails** | YouTube API `thumbnailUrl` | N/A (external) | No new image files needed; thumbnails come from YouTube. If you ever use custom thumbnails instead, use **640×360** (16:9). |

---

## 5. Header / logo

| Place | Current | Notes |
|-------|--------|--------|
| **Header logo** | Emoji 🌾 + text `SITE_NAME` | No image. If you add a logo image later, use **~200×60** (or similar height ~40–60px, width to match). |

---

## 6. Fallback / placeholder

| Place | Current | Recommended if replaced |
|-------|--------|---------------------------|
| **Product fallback** | Unsplash placeholder / `via.placeholder.com/400x400` | **400×400** or **800×800** square, brand-colored. |
| **Product JSON-LD when no image** | `https://via.placeholder.com/400x400/...` | Same as above or main product image. |

---

## Summary table (new/improved images only)

| Asset type | Quantity | Dimensions | Where used |
|------------|----------|------------|------------|
| Hero | 2 | **1400×600** or **1920×800** | Home hero carousel, Distributor hero |
| Category | 2 | **800×500** or **600×400** | Home “Shop by category” |
| Product (main) | 1 per product | **800×800** or **1000×1000** | Cards, product gallery, cart, OG |
| Product (thumbnail) | Same as main OK | **128×128** min for thumbnails | Gallery thumbs, cart row |
| Logo (optional) | 1 | **~200×60** | Header (currently emoji) |
| Fallback (optional) | 1 | **400×400** or **800×800** | When product image missing |

---

## Where image keys are defined

- **Hero & category:** `lib/data/productImages.ts` → `heroImages`, `categoryImages`
- **Per-product:** `lib/data/productImages.ts` → `productImages` (key = product `id`, e.g. `irr-001`, `mach-042`)
- **Components:**  
  - Hero: `components/home/HeroSection.tsx`  
  - Category: `components/home/CategoryGrid.tsx`  
  - Product card: `components/shared/ProductCard.tsx`  
  - Gallery: `components/product/ImageGallery.tsx`  
  - Cart: `app/(shop)/cart/page.tsx`  
  - Distributor hero: `app/(shop)/distributor/page.tsx`

---

## Your uploaded product photos (`agro/products/`)

- **Current layout:** `agro/products/product-1/`, `product-2/`, … with files like `1.png`, `2.png` inside each folder.
- **Mapping:** `product-1` = 1st product in the catalog, `product-2` = 2nd, etc. (same order as `lib/data/products.ts`).
- **How the app uses them:** Static files are served from `public/images/products/`. Run the copy script so your uploads are copied there with the correct slug filenames:
  ```bash
  node scripts/copy-product-images.js
  ```
  This copies `products/product-N/1.png` → `public/images/products/{slug}.png` for the first 8 products. After adding more photos to `products/product-3/`, `product-4/`, etc., run the script again. Product data expects **PNG** in `public/images/products/` (see `lib/data/products.ts` → `images: [/images/products/${slug}.png]`).
