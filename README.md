# MEKKK – Kézműves kecskesajt platform

Nuxt 4 + Tailwind CSS + Pinia + Supabase alapú mobil-first webapp.

## Stack

- **Nuxt 4** – file-based routing
- **Tailwind CSS** – Tailwind-first styling, zöld branding
- **Pinia** – state management (session memory, nincs localStorage)
- **Supabase** – adatbázis (PostgreSQL) + képtárolás (Storage)
- **Zod** – form validáció (formokhoz bevezetve)
- **TypeScript** – strict mode

## Környezeti változók

```bash
cp .env.example .env
# Töltsd ki NUXT_PUBLIC_SUPABASE_URL és NUXT_PUBLIC_SUPABASE_ANON_KEY értékeket
```

## Fejlesztés

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run preview   # production preview
```

## Adatbázis setup (egyszeri)

```bash
# 1. Futtasd db/migrations/schema.sql tartalmát a Supabase SQL Editorban
# 2. Seed + képfeltöltés:
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run migrate
```

Részletes leírás: [`docs/supabase_use.md`](docs/supabase_use.md)

## Funkciók

### Iteráció 1 – Főoldal (kecskesajt áttekintő)
- Termékkaruzel horizontálisan görgethető, körös képekkel
- Termék kiválasztása animált sötétzöld kiemelést vált ki
- Termelők listája megjelenik a kiválasztott termékhez
- Termelő kártya: nagy kép, név, értékelés (zöld csillag), szállítási idő percben
- Szűrők: „30 perc alatt", „Legmagasabb értékelés", „Rendezés" (bottom sheet)
- Visszaállítás gomb törli a kiválasztást és a szűrőket
- Termelő részletoldal: nagy kép, cím, szállítás/átvétel toggle, legtöbbet rendelt termékek

### Iteráció 2 – Supabase backend
- Minden adat Supabase PostgreSQL adatbázisból töltődik
- Képek Supabase Storage-ban tárolódnak
- Nincs localStorage, nincs browser-based perzisztencia
- Reprodukálható adatbázis setup: `schema.sql` + `migrate.js`

## Struktúra

```
app/
  pages/           # útvonalak
  components/      # UI komponensek (products/, producers/)
  composables/     # useSupabase, useProducerFilters
  stores/          # Pinia store-ok (async Supabase fetch)
  types/           # TypeScript interfészek
  assets/css/      # globális CSS (scrollbar-hide, transitions)
db/
  migrations/
    schema.sql     # adatbázis séma (manuálisan futtatandó)
    migrate.js     # seed + képfeltöltés script
docs/
  supabase_use.md  # Supabase integrációs dokumentáció
  backlog.homepage.md
public/
  pictures/        # logo
```
