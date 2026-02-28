/**
 * MEKKK – Database Population Script
 *
 * - Clears products table (cascades to producer_products)
 * - Uploads 10 product images from public/pictures/ to Supabase Storage
 * - Inserts 10 products
 * - Inserts 5 fixed producers with images from public/pictures/
 * - Inserts 20 random producers with picsum images
 * - Recreates all producer_products links
 * - Creates popular_products for 5 fixed producers
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node db/migrations/populate.js
 *   OR: node --env-file=.env db/migrations/populate.js
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
const BUCKET = 'mekkk-images'

// ── Helpers ───────────────────────────────────────────────────────────────────

async function uploadLocal(filePath, storagePath) {
  const buffer = readFileSync(filePath)
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: 'image/jpeg', upsert: true })
  if (error) throw new Error(`Upload failed ${storagePath}: ${error.message}`)
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl
}

async function uploadPicsum(seed, size, storagePath) {
  const url = `https://picsum.photos/seed/${seed}/${size}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: 'image/jpeg', upsert: true })
  if (error) throw new Error(`Upload failed ${storagePath}: ${error.message}`)
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl
}

// ── Products ──────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 'borsos',      name: 'Borsos kecskesajt',      label: 'borsos',      file: 'borsos.jpg' },
  { id: 'csipos',      name: 'Csípős kecskesajt',      label: 'csípős',      file: 'csipos.jpg' },
  { id: 'edes',        name: 'Édes kecskesajt',         label: 'édes',        file: 'edes.jpg' },
  { id: 'fustolt',     name: 'Füstölt kecskesajt',      label: 'füstölt',     file: 'fustolt.jpg' },
  { id: 'garnela',     name: 'Garnélás kecskesajt',     label: 'garnélás',    file: 'garnela.jpg' },
  { id: 'hazi',        name: 'Házi kecskesajt',         label: 'házi',        file: 'hazi.jpg' },
  { id: 'kapros',      name: 'Kapros kecskesajt',       label: 'kapros',      file: 'kapros.jpg' },
  { id: 'paradicsom',  name: 'Paradicsmos kecskesajt',  label: 'paradicsmos', file: 'paradicsom.jpg' },
  { id: 'sos',         name: 'Sós kecskesajt',          label: 'sós',         file: 'sos.jpg' },
  { id: 'spenot',      name: 'Spenótos kecskesajt',     label: 'spenótos',    file: 'spenot.jpg' },
]

async function seedProducts() {
  console.log('\n[1/5] Clearing products table...')
  const { error: delErr } = await supabase.from('products').delete().neq('id', '__none__')
  if (delErr) throw delErr

  console.log('[2/5] Uploading product images & inserting products...')
  const imageUrls = {}
  for (const p of PRODUCTS) {
    process.stdout.write(`  ${p.id}... `)
    const url = await uploadLocal(join('public/pictures', p.file), `products/${p.id}.jpg`)
    imageUrls[p.id] = url
    const { error } = await supabase.from('products').insert({ id: p.id, name: p.name, label: p.label, image: url })
    if (error) throw error
    console.log('✓')
  }
  return imageUrls
}

// ── Fixed producers ───────────────────────────────────────────────────────────

const FIXED_PRODUCERS = [
  {
    id: 'maria', name: 'Mária Gazdaság', file: 'maria.jpg',
    rating: 5.0, reviewCount: 312, deliveryMinutes: 15,
    address: '1023 Budapest, Bécsi út 182.',
    productIds: ['borsos', 'csipos', 'edes', 'fustolt', 'hazi', 'kapros', 'paradicsom', 'sos', 'spenot'],
    popularProducts: [
      { id: 'maria-pp-1', name: 'Sós kecskesajt',    price: 1590, description: 'Friss, kézzel formázott sós sajt',   productRef: 'sos' },
      { id: 'maria-pp-2', name: 'Kapros kecskesajt', price: 1690, description: 'Illatos kapros ízesítéssel',          productRef: 'kapros' },
      { id: 'maria-pp-3', name: 'Borsos kecskesajt', price: 1790, description: 'Enyhén csípős, pikáns változat',      productRef: 'borsos' },
    ],
  },
  {
    id: 'hegedus', name: 'Hegedűs Farm', file: 'hegedus.jpg',
    rating: 4.9, reviewCount: 187, deliveryMinutes: 20,
    address: '2030 Érd, Hegyi dűlő 8.',
    productIds: ['borsos', 'edes', 'fustolt', 'hazi', 'kapros', 'sos', 'spenot'],
    popularProducts: [
      { id: 'hegedus-pp-1', name: 'Füstölt kecskesajt', price: 1890, description: 'Bükkfán füstölve, intenzív ízű',     productRef: 'fustolt' },
      { id: 'hegedus-pp-2', name: 'Házi kecskesajt',    price: 1290, description: 'Lágy, natúr házisajt',               productRef: 'hazi' },
      { id: 'hegedus-pp-3', name: 'Édes kecskesajt',    price: 1490, description: 'Mézes, enyhén édes változat',         productRef: 'edes' },
    ],
  },
  {
    id: 'zsolt', name: 'Zsolt Tanya', file: 'zsolt.jpg',
    rating: 4.9, reviewCount: 203, deliveryMinutes: 22,
    address: '2600 Vác, Legelő sor 14.',
    productIds: ['csipos', 'edes', 'garnela', 'hazi', 'paradicsom', 'sos', 'spenot'],
    popularProducts: [
      { id: 'zsolt-pp-1', name: 'Garnélás kecskesajt',  price: 1990, description: 'Mediterrán ízvilág, garnélával',     productRef: 'garnela' },
      { id: 'zsolt-pp-2', name: 'Spenótos kecskesajt',  price: 1590, description: 'Friss spenóttal, zöldes árnyalat',   productRef: 'spenot' },
      { id: 'zsolt-pp-3', name: 'Csípős kecskesajt',    price: 1690, description: 'Erős paprikával ízesített',          productRef: 'csipos' },
    ],
  },
  {
    id: 'dominik', name: 'Dominik Major', file: 'dominik.jpg',
    rating: 4.9, reviewCount: 144, deliveryMinutes: 18,
    address: '2094 Nagykovácsi, Erdőszél dűlő 3.',
    productIds: ['borsos', 'csipos', 'fustolt', 'garnela', 'kapros', 'paradicsom', 'spenot'],
    popularProducts: [
      { id: 'dominik-pp-1', name: 'Paradicsmos kecskesajt', price: 1490, description: 'Szárított paradicsommal',              productRef: 'paradicsom' },
      { id: 'dominik-pp-2', name: 'Garnélás kecskesajt',    price: 1890, description: 'Friss garnélával, enyhén sós',          productRef: 'garnela' },
      { id: 'dominik-pp-3', name: 'Kapros kecskesajt',      price: 1590, description: 'Klasszikus kapros recept',               productRef: 'kapros' },
    ],
  },
  {
    id: 'dzsoki', name: 'Dzsoki Legelő', file: 'dzsoki.jpg',
    rating: 4.7, reviewCount: 98, deliveryMinutes: 25,
    address: '2120 Dunakeszi, Rét utca 7.',
    productIds: ['borsos', 'edes', 'fustolt', 'hazi', 'kapros', 'sos', 'spenot'],
    popularProducts: [
      { id: 'dzsoki-pp-1', name: 'Sós kecskesajt',     price: 1390, description: 'Egyszerű, megbízható sós alap',      productRef: 'sos' },
      { id: 'dzsoki-pp-2', name: 'Édes kecskesajt',    price: 1290, description: 'Gyengéd, enyhén édes ízesítés',      productRef: 'edes' },
      { id: 'dzsoki-pp-3', name: 'Spenótos kecskesajt',price: 1490, description: 'Friss spenóttal keverve',            productRef: 'spenot' },
    ],
  },
]

async function seedFixedProducers(imageUrls) {
  console.log('\n[3/5] Uploading fixed producer images & inserting...')
  for (const p of FIXED_PRODUCERS) {
    process.stdout.write(`  ${p.id}... `)
    const image = await uploadLocal(join('public/pictures', p.file), `producers/${p.id}.jpg`)
    const { error } = await supabase.from('producers').upsert({
      id: p.id, name: p.name, image,
      rating: p.rating, review_count: p.reviewCount,
      delivery_minutes: p.deliveryMinutes, address: p.address,
    })
    if (error) throw error

    // popular_products (use product image URLs, no extra upload needed)
    for (const pp of p.popularProducts) {
      const { error: ppErr } = await supabase.from('popular_products').upsert({
        id: pp.id, producer_id: p.id,
        name: pp.name, price: pp.price, description: pp.description,
        image: imageUrls[pp.productRef],
      })
      if (ppErr) throw ppErr
    }
    console.log('✓')
  }
}

// ── Random producers ──────────────────────────────────────────────────────────

const RANDOM_NAMES    = ['Kővágó Tanya','Berki Major','Napsugár Gazdaság','Fekete Tanya','Cserhalmi Farm','Pálos Legelő','Szivárvány Major','Rétvölgy Gazdaság','Homoki Farm','Vásárhelyi Tanya','Kékesi Major','Erdőszél Farm','Pataki Legelő','Dobozi Tanya','Almádi Farm','Cigány Major','Tóparti Gazdaság','Méhes Farm','Borjúhegyi Tanya','Szőlőhegyi Farm']
const RANDOM_ADDR     = ['3300 Eger, Kővágó dűlő 3.','8200 Veszprém, Berki köz 7.','7400 Kaposvár, Napsugár út 15.','4400 Nyíregyháza, Fekete tanya 2.','6500 Baja, Cserhalmi dűlő 8.','5000 Szolnok, Pálos sor 12.','3400 Mezőkövesd, Szivárvány utca 5.','8900 Zalaegerszeg, Rétvölgy 19.','6720 Szeged, Homoki tanya 4.','6800 Hódmezővásárhely, Vásárhelyi sor 9.','3100 Salgótarján, Kékesi dűlő 6.','9700 Szombathely, Erdőszél utca 11.','5600 Békéscsaba, Pataki köz 3.','5530 Vésztő, Dobozi sor 7.','8220 Balatonalmádi, Almádi dűlő 14.','7900 Szigetvár, Cigány major 2.','8600 Siófok, Tóparti út 21.','4200 Hajdúszoboszló, Méhes köz 8.','3700 Kazincbarcika, Borjúhegyi sor 16.','7630 Pécs, Szőlőhegy dűlő 5.']
const RANDOM_RATINGS  = [1.5,1.8,2.0,2.1,2.3,2.4,2.6,2.7,2.8,2.9,3.0,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8,3.9]
const RANDOM_REVIEWS  = [3,5,7,8,4,12,6,9,15,11,8,14,7,3,10,18,5,9,12,6]
const RANDOM_DELIVERY = [35,42,55,60,38,45,70,32,48,52,63,75,28,44,90,36,68,50,57,40]

const ALL_PRODUCT_IDS = ['borsos','csipos','edes','fustolt','garnela','hazi','kapros','paradicsom','sos','spenot']

function getProductSet(index) {
  const count = 7 + (index % 3)
  const offset = (index * 7) % 10
  const set = []
  for (let i = 0; i < count; i++) set.push(ALL_PRODUCT_IDS[(offset + i) % 10])
  return set
}

async function seedRandomProducers() {
  console.log('\n[4/5] Uploading random producer images & inserting...')
  for (let i = 0; i < 20; i++) {
    const id = `rand-${String(i + 1).padStart(2, '0')}`
    process.stdout.write(`  ${id} (${RANDOM_NAMES[i]})... `)
    const image = await uploadPicsum(`mekkk-rand-${i + 1}`, '400/400', `producers/${id}.jpg`)
    const { error } = await supabase.from('producers').upsert({
      id, name: RANDOM_NAMES[i], image,
      rating: RANDOM_RATINGS[i], review_count: RANDOM_REVIEWS[i],
      delivery_minutes: RANDOM_DELIVERY[i], address: RANDOM_ADDR[i],
    })
    if (error) throw error
    console.log('✓')
  }
}

// ── Producer–product links ────────────────────────────────────────────────────

async function seedProducerProducts() {
  console.log('\n[5/5] Inserting producer_products links...')

  const rows = []

  // Existing old producers still in DB
  const oldLinks = {
    'hegyi-majorsag': ['sos', 'kapros', 'fustolt'],
    'napfeny-farm':   ['edes', 'hazi', 'fustolt'],
  }
  for (const [producerId, productIds] of Object.entries(oldLinks)) {
    for (const productId of productIds) rows.push({ producer_id: producerId, product_id: productId })
  }

  // Fixed 5
  for (const p of FIXED_PRODUCERS) {
    for (const productId of p.productIds) rows.push({ producer_id: p.id, product_id: productId })
  }

  // Random 20
  for (let i = 0; i < 20; i++) {
    const id = `rand-${String(i + 1).padStart(2, '0')}`
    for (const productId of getProductSet(i)) rows.push({ producer_id: id, product_id: productId })
  }

  const { error } = await supabase.from('producer_products').upsert(rows)
  if (error) throw error
  console.log(`  ✓ ${rows.length} links inserted`)
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 MEKKK populate starting...')
  const imageUrls = await seedProducts()
  await seedFixedProducers(imageUrls)
  await seedRandomProducers()
  await seedProducerProducts()
  console.log('\n✅ Population complete!')
}

main().catch(err => {
  console.error('\n❌ Failed:', err.message)
  process.exit(1)
})
