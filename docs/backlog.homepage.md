# MEKKK – Backlog

## Iteráció 0 – Projekt inicializálás

- Nuxt 4 + Tailwind CSS skeleton létrehozva
- `CLAUDE.md` projekt irányelvek rögzítve és kitakarítva (előző projekt maradványok eltávolítva)
- `docs/backlog.homepage.md` backlog fájl létrehozva

## Iteráció 1 – Főoldal: Kecskesajt áttekintő

- `@pinia/nuxt` és `zod` telepítve
- `app/types/product.ts`, `app/types/producer.ts` – alap TypeScript interfészek
- `app/stores/products.ts` – 5 mock sajttípus, kiválasztás állapota (selectedProductId)
- `app/stores/producers.ts` – 4 mock termelő, termékhez rendelve
- `app/components/AppHeader.vue` – logo + opcionális kenyérmorzsás navigáció
- `app/components/products/ProductCard.vue` – körös kép zöld háttérrel, kiválasztás animáció
- `app/components/products/ProductCarousel.vue` – horizontálisan görgethető sor + Visszaállítás gomb
- `app/components/producers/ProducerCard.vue` – körös kép, név, zöld csillag értékelés, szállítási idő
- `app/components/producers/ProducerList.vue` – "N találat" fejléc + grid
- `app/pages/index.vue` – főoldal: karuzel + animált termelőlista
- `app/pages/producers/[id].vue` – termelő részletoldal: hero kép, Kiszállítás/Átvétel toggle, legtöbbet rendeltek
- `app/assets/css/main.css` – `scrollbar-hide`, `slide-down` transition

## Iteráció 2 – Szűrők, rendezés, megújult termelőkártyák (PRD 02)

- `app/types/producer.ts` – `deliveryTime: string` → `deliveryMinutes: number`
- `app/stores/producers.ts` – mock adat frissítve: percalapú szállítási idő (Hegyi Majorság: 42 perc, többi <30 perc)
- `app/composables/useProducerFilters.ts` – filter/rendezés állapot és logika (30 perc szűrő, legmagasabb értékelés, egyéni rendezés)
- `app/components/products/ProductCard.vue` – nincs háttér kiválasztás nélkül; kiválasztáskor sötétzöld lekerekített négyzet animációval
- `app/components/products/ProductCarousel.vue` – Visszaállítás gomb eltávolítva (átkerült a termelőlista fejlécébe)
- `app/components/producers/FilterRow.vue` – horizontálisan görgethető szűrősor: "30 perc alatt", "Legmagasabb értékelés", "Rendezés ▾"
- `app/components/producers/ProducerCard.vue` – nagy kártya design (~90% szélesség, téglalap, kép + név + csillag + perc)
- `app/components/producers/ProducerList.vue` – találat fejléc bal oldalon + Visszaállítás gomb jobb oldalon; TransitionGroup kártyákra
- `app/components/producers/SortingBottomSheet.vue` – bottom sheet modal: Teleport, dim overlay, radio csoport, Alkalmaz/Visszaállítás gombok
- `app/pages/index.vue` – filter composable bedrótolva, FilterRow + SortingBottomSheet integrálva
- `app/assets/css/main.css` – `slide-up`, `fade`, `producer-list` animációk hozzáadva

## Iteráció 3 – Supabase backend integráció (PRD 03)

- `package.json` – `@supabase/supabase-js` dependency hozzáadva, `npm run migrate` script
- `nuxt.config.ts` – `runtimeConfig.public.supabaseUrl` + `supabaseAnonKey`
- `.env.example` – app és migration env változók dokumentálva
- `app/types/product.ts` – `producerIds` eltávolítva (DB kezeli)
- `app/types/producer.ts` – `productIds` eltávolítva, `popularProducts` opcionális
- `app/composables/useSupabase.ts` – singleton Supabase kliens, `useRuntimeConfig()` alapján
- `app/stores/products.ts` – hardcoded mock → `fetchProducts()` async Supabase query
- `app/stores/producers.ts` – hardcoded mock → `fetchByProductId()` + `fetchById()` async Supabase query join-nal
- `app/pages/index.vue` – `onMounted` fetch, async product select handler, loading spinner
- `app/pages/producers/[id].vue` – `onMounted` Supabase fetch, loading state
- `db/migrations/schema.sql` – 4 tábla CREATE + updated_at trigger + RLS public read policy
- `db/migrations/migrate.js` – standalone seed script: Storage bucket, képfeltöltés picsum → Supabase, upsert
- `docs/supabase_use.md` – teljes Supabase integrációs dokumentáció
- `README.md` – stack, env setup, migrate parancs frissítve

## Iteráció 4 – DB feltöltés + hamburger menü (PRD 04)

- `db/migrations/populate.js` – 10 termék (public/pictures képekkel) + 5 fix termelő (maria, hegedus, zsolt, dominik, dzsoki) + 20 random termelő (picsum) + popular_products + producer_products (202 link)
- Supabase Storage: összes kép feltöltve (`products/`, `producers/`, `popular-products/`)
- `app/components/AppHeader.vue` – 3 oszlopos fejléc: hamburger bal, logo közép (NuxtLink /), profil ikon jobb; breadcrumbs alatta
- `app/components/HamburgerMenu.vue` – bal oldali drawer (80% szélesség), Teleport, slide-left + fade animáció, body scroll lock, overlay-kattintásra bezár
- `app/pages/rolunk.vue`, `szabalyzat.vue`, `termeloink.vue` – placeholder oldalak breadcrumbs navigációval
- `app/pages/kecskesajt/tipusok.vue` – 10 sajttípus leírással
- `app/pages/kecskesajt/keszites.vue` – 6 lépéses sajtkészítési folyamat
- `app/pages/kecskesajt/tortenete.vue` – kecskesajt történeti háttér
- `app/assets/css/main.css` – `slide-left` animáció hozzáadva

## Iteráció 5 – Termék részletek és interaktív rendelés (PRD 05)

- `db/migrations/schema.sql` – `products` tábla: `price INTEGER`, `description TEXT` hozzáadva; `popular_products`: `product_id TEXT FK` hozzáadva
- `db/migrations/update-products.js` – script: 10 termék ár+leírás frissítése, `popular_products.product_id` beállítása
- `package.json` – `populate` + `update-products` npm script hozzáadva
- `app/types/producer.ts` – `Producer` interfész: `otherProducts?: PopularProduct[]` mező hozzáadva
- `app/stores/cart.ts` – új Pinia store: session-alapú counter state, `increment/decrement/getQuantity/reset`, `totalItems`, `totalPrice`
- `app/stores/producers.ts` – `otherProducts` ref hozzáadva; `fetchById` lekéri a `product_id`-t a popular_products-ből; `fetchOtherProducts` kiszűri a popular termékeket a producer_products-ből
- `app/assets/css/main.css` – `count-up` / `count-down` Transition animációk hozzáadva (függőleges szám csúszás)
- `app/components/producers/ProductOrderCard.vue` – termék kártya: 50% kép + 50% info; zöld + gomb (1/3 kép méret); bal irányba bővülő minus|counter|plus sáv; counter animáció
- `app/components/producers/ProductModal.vue` – 75% magasságú bottom sheet: teljes szélességű kép, X gomb, zöld ár, leírás, counter bal, Hozzáadás gomb jobb; háttérre kattintva bezár
- `app/components/producers/OrderBar.vue` – fix bottom bar: zöld, "Rendelés megtekintése" + összár, megjelenik/eltűnik dinamikusan
- `app/pages/producers/[id].vue` – "Legtöbbet rendeltek" + "További termékek" szekciók `ProductOrderCard`-okkal; `ProductModal` + `OrderBar` integrálva; cart reset mount/unmount-kor
- `app/components/HamburgerMenu.vue` – "AI receptek" menüpont hozzáadva (zöld, nagyobb betű, AI ikon, elválasztóval)
- `app/pages/ai-receptek.vue` – placeholder oldal AI ikon fejléccel, skeleton kártyák, "fejlesztés alatt" banner

---

<!-- Minden iteráció végén adj hozzá egy új ## Iteráció X blokkot rövid bullet pontokkal -->
