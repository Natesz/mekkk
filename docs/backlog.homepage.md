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

---

<!-- Minden iteráció végén adj hozzá egy új ## Iteráció X blokkot rövid bullet pontokkal -->
