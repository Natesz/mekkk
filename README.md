# MEKKK – Kézműves kecskesajt platform

A MEKKK egy mobil-first webalkalmazás, amely összehozza a kézműves kecskesajt termelőket a vásárlókkal. A platform lehetővé teszi a termelők böngészését, termékek kosárba helyezését, biztonságos online fizetést, és mesterséges intelligencia alapú receptajánlóval segíti a vásárlási döntést.

---

## Mit tud a platform?

### Termelők böngészése
- A főoldalon böngészheted az összes kézműves termelőt
- Szűrés és rendezés: gyors kiszállítás, legmagasabb értékelés
- Minden termelőnek saját oldala van: termékek, árak, szállítási idő

### Rendelés és fizetés
- Termékeket adhatsz a kosárhoz közvetlenül a termelő oldalán
- Megjegyzést fűzhetsz a rendeléshez (pl. különleges kérések)
- Biztonságos online fizetés **Barion** rendszeren keresztül
- A sikeres fizetés után a rendelés automatikusan mentődik

### Korábbi rendelések
- A fejléc jobb oldalán a profilikon megnyitja a rendelési előzményeket
- Látod az összes korábbi rendelést: termelő neve, dátum, végösszeg

### AI receptajánló
- Válassz 1–3 kecskesajt típust, és a mesterséges intelligencia egyedi receptet generál
- A recept mellé ételfotó is készül automatikusan
- Ha a képgenerálás nem sikerül, a recept szövege akkor is megjelenik

---

## Fejlesztőknek

### Stack
- **Nuxt 4** – file-based routing
- **Tailwind CSS** – Tailwind-first styling, zöld branding
- **Pinia** – state management (session memory)
- **Supabase** – adatbázis (PostgreSQL) + képtárolás (Storage)
- **Barion** – online fizetési integráció
- **OpenAI** – GPT-4o-mini (receptszöveg) + DALL-E 3 (ételfotó)
- **Zod** – validáció
- **TypeScript** – strict mode

### Környezeti változók

```bash
cp .env .env.local
# Szükséges kulcsok: NUXT_PUBLIC_SUPABASE_URL, NUXT_PUBLIC_SUPABASE_ANON_KEY,
# NUXT_SUPABASE_SERVICE_ROLE_KEY, NUXT_OPENAI_API_KEY, BARION_POS_KEY, stb.
```

### Fejlesztés

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run preview   # production preview
```

### Adatbázis setup (egyszeri)

```bash
# 1. Futtasd a Supabase SQL Editorban:
#    db/migrations/schema.sql          (alap táblák)
#    db/migrations/orders-schema.sql   (rendelés táblák)

# 2. Termelők és termékek feltöltése:
node --env-file=.env db/migrations/populate.js

# 3. Termelő képek frissítése (rand- képek):
npm run upload-rand-images
```

### Struktúra

```
app/
  pages/           # útvonalak (főoldal, termelők, pénztár, AI receptek, rendeléseim)
  components/      # UI komponensek (products/, producers/)
  composables/     # useSupabase, useProducerFilters
  stores/          # Pinia store-ok (cart, products, producers)
  types/           # TypeScript interfészek
  assets/css/      # globális CSS (animációk, transitions)
server/
  api/             # szerver route-ok (Barion, OpenAI)
  utils/           # szerver segédeszközök (Supabase service_role kliens)
db/
  migrations/      # SQL sémák + seed scriptek
docs/
  backlog.homepage.md   # fejlesztési napló iterációnként
  barion-setup.md       # Barion integráció dokumentáció
  supabase_use.md       # Supabase integráció dokumentáció
public/
  pictures/        # logo + termékképek
```

---

## Funkciók összefoglalója

| Funkció | Leírás |
|---------|--------|
| Termelők listája | Szűrhető, rendezhető kártya nézet |
| Termelő részletoldal | Termékek, árak, kosárba helyezés |
| Kosár és rendelés | Mennyiség állítás, megjegyzés |
| Barion fizetés | Biztonságos online bankkártyás fizetés |
| Rendelési előzmények | Korábbi rendelések listája (`/korabbi-rendeleseim`) |
| AI receptajánló | GPT-4o-mini recept + DALL-E 3 ételfotó |
| Mobil-first design | Optimalizált kisebb képernyőkre |
