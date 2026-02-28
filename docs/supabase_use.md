# Supabase használati útmutató – MEKKK

Ez a dokumentum leírja, hogyan csatlakozik a MEKKK alkalmazás a Supabase backendhez, és hogyan kell az adatbázist beállítani, feltölteni, illetve kezelni.

---

## 1. Kapcsolódás beállítása

### Szükséges környezeti változók

```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Ezeket a Supabase Dashboard → **Settings → API** oldalon találod.

A `.env.example` fájlból másold le:

```bash
cp .env.example .env
# majd töltsd ki az értékeket
```

### Supabase kliens inicializálása

A projekt `useSupabase()` composable-t használ (`app/composables/useSupabase.ts`):

```ts
// Bármely store-ban vagy composable-ben:
const supabase = useSupabase()
```

A kliens singleton – az első hívás létrehozza, a többi újrahasználja.

---

## 2. Adatbázis táblák létrehozása

Futtatsd a `db/migrations/schema.sql` fájl tartalmát a Supabase **SQL Editor**-ban:

1. Nyisd meg a Supabase projektet
2. Navigálj: **SQL Editor → New query**
3. Illeszd be a `schema.sql` tartalmát
4. Kattints **Run**-ra

### Táblák

| Tábla | Leírás |
|-------|--------|
| `products` | Sajttípusok (sós, édes, kapros…) |
| `producers` | Termelők alapadatai |
| `producer_products` | Termelő ↔ sajttípus kapcsolat (N:M) |
| `popular_products` | Termelő legtöbbször rendelt termékei |

Minden táblán `created_at` és `updated_at` timestamp, automatikus triggerrel.

---

## 3. Migráció és seed futtatása

A seed script letölti a képeket és feltölti a Supabase Storage-ba, majd beszúrja az összes adatot.

### Előfeltételek

- A `schema.sql` már fut az adatbázisban (ld. 2. pont)
- A `.env` fájlban a service role key is bevan töltve:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

A service role key a Supabase Dashboard → **Settings → API → service_role** alatt található.

### Futtatás

```bash
# Node 18+ (native fetch szükséges)
SUPABASE_URL=https://... SUPABASE_SERVICE_ROLE_KEY=sk_... node db/migrations/migrate.js

# Vagy .env fájlból (Node 20.6+):
node --env-file=.env db/migrations/migrate.js

# Vagy npm script-ként (ha a .env be van töltve):
npm run migrate
```

A script **idempotens** – többször is futtatható, `upsert`-et használ.

---

## 4. Képek feltöltése Supabase Storage-ba

### Bucket neve: `mekkk-images`

A bucket automatikusan létrejön a migration script futtatásakor.

### Kézi feltöltés kódból

```ts
const supabase = useSupabase()

// Fájl feltöltése
const { error } = await supabase.storage
  .from('mekkk-images')
  .upload('producers/uj-termelő.jpg', fileBuffer, {
    contentType: 'image/jpeg',
    upsert: true,
  })

// Publikus URL lekérése
const { data } = supabase.storage
  .from('mekkk-images')
  .getPublicUrl('producers/uj-termelő.jpg')

console.log(data.publicUrl) // → https://...supabase.co/storage/v1/object/public/mekkk-images/...
```

### Storage könyvtárstruktúra

```
mekkk-images/
├── products/         ← sajt képek (200x200)
├── producers/        ← termelő képek (400x400)
└── popular-products/ ← popular product képek (120x120)
```

---

## 5. CRUD műveletek

### Rekord létrehozása

```ts
const supabase = useSupabase()

const { data, error } = await supabase
  .from('producers')
  .insert({
    id: 'uj-farm',
    name: 'Új Farm',
    image: 'https://...publicUrl',
    rating: 4.5,
    review_count: 0,
    delivery_minutes: 20,
    address: '1234 Budapest, Példa utca 1.',
  })
  .select()
  .single()
```

### Rekord lekérése

```ts
// Egyedi rekord ID szerint
const { data } = await supabase
  .from('producers')
  .select('*')
  .eq('id', 'kovacs-farm')
  .single()

// Lista szűrővel
const { data } = await supabase
  .from('producers')
  .select('*')
  .lt('delivery_minutes', 30)  // 30 perc alatt
```

### Rekord frissítése

```ts
const { error } = await supabase
  .from('producers')
  .update({ rating: 4.9 })
  .eq('id', 'kovacs-farm')
```

### Rekord törlése

```ts
const { error } = await supabase
  .from('producers')
  .delete()
  .eq('id', 'torlendo-farm')
```

---

## 6. Rendezett lekérés

```ts
// Értékelés szerint csökkenő
const { data } = await supabase
  .from('producers')
  .select('*')
  .order('rating', { ascending: false })

// Szállítási idő szerint növekvő
const { data } = await supabase
  .from('producers')
  .select('*')
  .order('delivery_minutes', { ascending: true })
```

---

## 7. Kapcsolódó táblák lekérése (join)

### Termelők egy adott sajttípushoz

```ts
const { data } = await supabase
  .from('producers')
  .select('id, name, rating, delivery_minutes, producer_products!inner(product_id)')
  .eq('producer_products.product_id', 'sos')
```

### Termelő részletei popular_products-szal

```ts
const { data } = await supabase
  .from('producers')
  .select('*, popular_products(id, name, price, description, image)')
  .eq('id', 'kovacs-farm')
  .single()
```

---

## 8. Hibaelhárítás

| Probléma | Ok | Megoldás |
|----------|----|----------|
| `TypeError: fetch is not a function` | Node < 18 | Frissíts Node 18+-ra |
| `relation "products" does not exist` | Schema nem futott | Futtasd a `schema.sql`-t |
| `row-level security policy` hiba | RLS nincs beállítva | A schema.sql tartalmazza a public read policy-kat |
| `storage bucket already exists` | Normális, script kezeli | Nincs teendő |
| Üres adatok az appban | Env var hiányzik | Ellenőrizd a `.env` fájlt |
