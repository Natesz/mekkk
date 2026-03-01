# Barion fizetési integráció – MEKKK setup útmutató

## Áttekintés

A Barion egy magyar fizetési szolgáltató. Az integráció **redirect alapú**:
a felhasználó a Barion biztonságos fizetési oldalára kerül, ott fizet, majd visszakerül az apphoz.
Nincs iframe – ez kötelező a Barion szabályzata szerint.

---

## 1. Fiók regisztráció és POSKey megszerzése

### Sandbox (fejlesztési) környezet

1. Menj ide: **https://secure.test.barion.com/**
2. Kattints a **„Regisztráció"** gombra
3. Add meg az adatokat (e-mail, jelszó) → aktiváló e-mail jön
4. Aktiválás után lépj be
5. Hozz létre egy boltot: **Boltok → + Új bolt létrehozása**
6. Sandbox-ban a bolt **azonnal jóváhagyott** (nincs kézi review)
7. POSKey helye: **Boltok → Műveletek → Részletek → „Titkos kulcs"**

> A POSKey egy UUID formátumú string, pl.: `d9e280bc-a56e-4f64-ac77-e5e9aedbbf58`

### Production (éles) környezet

1. Regisztráció: **https://secure.barion.com/**
2. Ugyanaz a folyamat, de a bolt jóváhagyása **kézi, Barion részéről** (1-3 munkanap)
3. Éles POSKey ugyanott található: Boltok → Műveletek → Részletek → „Titkos kulcs"

> **Fontos:** A sandbox és az éles POSKey különbözik. Sosem szabad összekeverni.

---

## 2. Szükséges kulcsok és környezeti változók

### Szerver oldali (privát – sosem kerülhet kliensre)

| Változó | Leírás | Példa érték |
|---|---|---|
| `BARION_POS_KEY` | A bolt titkos kulcsa (Barion dashboardból) | `d9e280bc-a56e-4f64-...` |
| `BARION_PAYEE_EMAIL` | A bolt Barion fiókjának e-mail címe | `bolt@mekkk.hu` |
| `BARION_WEBHOOK_URL` | Barion ide küld státuszértesítést | `https://mekkk.vercel.app/api/barion-webhook` |
| `BARION_REDIRECT_URL` | Ide kerül vissza a felhasználó fizetés után | `https://mekkk.vercel.app/penztar/visszaigazolas` |
| `BARION_API_BASE` | API alap URL (sandbox vs éles) | `https://api.test.barion.com` |

### `.env` fájl (helyi fejlesztéshez)

```env
# Barion – sandbox
BARION_POS_KEY=ide_illeszd_a_sandbox_poskey_t
BARION_PAYEE_EMAIL=a_bolt_barion_email_cimet_ide
BARION_WEBHOOK_URL=https://<ngrok-tunnel>/api/barion-webhook
BARION_REDIRECT_URL=http://localhost:3000/penztar/visszaigazolas
BARION_API_BASE=https://api.test.barion.com
```

> **Webhook localhoston:** A Barion-nak publikusan elérhető URL kell a callbackhez.
> Helyi fejlesztéshez használj **ngrok**-ot: `ngrok http 3000` → a kapott https URL-t add meg `BARION_WEBHOOK_URL`-ként.

### `nuxt.config.ts` bővítése

```ts
runtimeConfig: {
  barionPosKey: '',           // BARION_POS_KEY
  barionPayeeEmail: '',       // BARION_PAYEE_EMAIL
  barionWebhookUrl: '',       // BARION_WEBHOOK_URL
  barionRedirectUrl: '',      // BARION_REDIRECT_URL
  barionApiBase: '',          // BARION_API_BASE
  // ... meglévő kulcsok (openaiApiKey, stb.)
}
```

---

## 3. Fizetési folyamat lépései

```
[Felhasználó: "Pénztárhoz"]
        ↓
[MEKKK szerver: POST /v2/Payment/Start → Barion API]
        ↓
[Barion visszaad: PaymentId + GatewayUrl]
        ↓
[MEKKK: redirect → GatewayUrl]
        ↓
[Felhasználó fizet a Barion oldalán]
        ↓
[Barion: POST → BARION_WEBHOOK_URL (státuszértesítés)]
        ↓
[MEKKK szerver: GET /v2/Payment/GetPaymentState → ellenőrzés]
        ↓
[Barion: redirect → BARION_REDIRECT_URL]
        ↓
[Felhasználó visszakerül az appba: /penztar/visszaigazolas]
```

---

## 4. API végpontok

| Cél | Metódus | URL |
|---|---|---|
| Fizetés indítása | POST | `{BARION_API_BASE}/v2/Payment/Start` |
| Fizetés státusza | GET | `{BARION_API_BASE}/v2/Payment/GetPaymentState?paymentId={id}` |
| Webhook (bejövő) | POST | A te szervereden (pl. `/api/barion-webhook`) |

---

## 5. Payment/Start kérés – kötelező mezők

```json
{
  "POSKey": "BARION_POS_KEY értéke",
  "PaymentType": "Immediate",
  "PaymentRequestId": "egyedi-rendelés-id (pl. uuid-timestamp)",
  "Payee": "BARION_PAYEE_EMAIL értéke",
  "Total": 4990,
  "Currency": "HUF",
  "Locale": "hu-HU",
  "GuestCheckOut": true,
  "FundingSources": ["All"],
  "RedirectUrl": "BARION_REDIRECT_URL értéke",
  "CallbackUrl": "BARION_WEBHOOK_URL értéke",
  "Transactions": [
    {
      "POSTransactionId": "egyedi-tranzakció-id",
      "Payee": "BARION_PAYEE_EMAIL értéke",
      "Total": 4990,
      "Comment": "MEKKK rendelés",
      "Items": [
        {
          "Name": "Lágy kecskesajt",
          "Description": "Hegyi Majorság – Lágy kecskesajt",
          "Quantity": 2,
          "Unit": "db",
          "UnitPrice": 1990,
          "ItemTotal": 3980
        },
        {
          "Name": "Szállítási díj",
          "Description": "Házhozszállítás",
          "Quantity": 1,
          "Unit": "db",
          "UnitPrice": 1010,
          "ItemTotal": 1010
        }
      ]
    }
  ]
}
```

> **HUF összegek:** egész számok, fillér nélkül (4990 = 4 990 Ft). Nem kell centté konvertálni.

### Sikeres válasz

```json
{
  "PaymentId": "ee849878c554ef118c0c001dd8b71cc5",
  "PaymentRequestId": "sajat-rendelés-azonosítód",
  "Status": "Prepared",
  "GatewayUrl": "https://secure.test.barion.com/Pay?Id=ee849878c554ef118c0c001dd8b71cc5",
  "Errors": []
}
```

→ A felhasználót a `GatewayUrl`-re kell irányítani (`window.location.href = ...`).

---

## 6. Webhook / callback

A Barion a `CallbackUrl`-re küld egy POST-ot, ha a fizetés státusza megváltozik:

```json
{ "paymentId": "ee849878c554ef118c0c001dd8b71cc5" }
```

A szerverednek **15 másodpercen belül HTTP 200-at** kell visszaadnia.
Ezután a szerver lekérdezi a `GetPaymentState` végpontot a tényleges státuszhoz.

**Lehetséges státuszok:**

| Státusz | Jelentés |
|---|---|
| `Succeeded` | Fizetés sikeres |
| `Canceled` | Felhasználó visszalépett |
| `Expired` | Lejárt a fizetési ablak (30 perc) |
| `Failed` | Visszautasított kártya |

**Barion újrapróbálkozás:** ha nem kap 200-at, 5-ször próbálkozik (2s, 6s, 18s, 54s, 102s késéssel).

---

## 7. Tesztkártyák (sandbox)

### ✅ Sikeres fizetés

| Mező | Érték |
|---|---|
| **Kártyaszám** | `4444 8888 8888 5559` |
| **Lejárat** | Bármely jövőbeli dátum (pl. `12/27`) |
| **CVC** | Bármely 3 jegyű szám (pl. `123`) |
| **Kártyabirtokos neve** | Bármilyen szöveg |

### ❌ Sikertelen fizetés (elutasítás teszteléséhez)

| Mező | Érték |
|---|---|
| **Kártyaszám** | `4444 8888 8888 4446` |
| **Lejárat** | Bármely jövőbeli dátum |
| **CVC** | Bármely 3 jegyű szám |

> Sandbox-ban nincs 3D Secure ellenőrzés. Bármely jövőbeli dátum és bármely CVC elfogadott.

---

## 8. Szerver oldali implementáció vázlata (Nuxt)

```ts
// server/api/barion-start.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { items, total, orderId } = await readBody(event)

  const body = {
    POSKey: config.barionPosKey,
    PaymentType: 'Immediate',
    PaymentRequestId: `mekkk-${orderId}-${Date.now()}`,
    Payee: config.barionPayeeEmail,
    Total: total,
    Currency: 'HUF',
    Locale: 'hu-HU',
    GuestCheckOut: true,
    FundingSources: ['All'],
    RedirectUrl: config.barionRedirectUrl,
    CallbackUrl: config.barionWebhookUrl,
    Transactions: [{
      POSTransactionId: `txn-${orderId}`,
      Payee: config.barionPayeeEmail,
      Total: total,
      Comment: 'MEKKK rendelés',
      Items: items.map((i: any) => ({
        Name: i.name,
        Description: i.name,
        Quantity: i.quantity,
        Unit: 'db',
        UnitPrice: i.unitPrice,
        ItemTotal: i.quantity * i.unitPrice,
      })),
    }],
  }

  const res = await $fetch<any>(`${config.barionApiBase}/v2/Payment/Start`, {
    method: 'POST',
    body,
  })

  if (res.Errors?.length) throw createError({ statusCode: 400, message: res.Errors[0].Description })

  return { gatewayUrl: res.GatewayUrl, paymentId: res.PaymentId }
})
```

```ts
// server/api/barion-webhook.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { paymentId } = await readBody(event)

  const state = await $fetch<any>(
    `${config.barionApiBase}/v2/Payment/GetPaymentState?paymentId=${paymentId}`,
    { headers: { 'x-pos-key': config.barionPosKey } }
  )

  // TODO: státusz alapján rendelés frissítése DB-ben
  console.log(`Barion webhook: ${paymentId} → ${state.Status}`)

  return { ok: true } // HTTP 200 kötelező
})
```

---

## 9. Hasznos linkek

- Sandbox dashboard: https://secure.test.barion.com/
- Éles dashboard: https://secure.barion.com/
- Hivatalos dokumentáció: https://docs.barion.com/
- Payment/Start referencia: https://docs.barion.com/Payment-Start-v2
- Tesztkártyák: https://docs.barion.com/Making_a_test_payment
- Callback mechanizmus: https://docs.barion.com/Callback_mechanism
- Node.js Barion könyvtár (opcionális): https://github.com/aron123/node-barion
