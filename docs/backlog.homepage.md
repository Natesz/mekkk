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

---

<!-- Minden iteráció végén adj hozzá egy új ## Iteráció X blokkot rövid bullet pontokkal -->
