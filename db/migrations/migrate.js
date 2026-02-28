/**
 * MEKKK – Supabase Seed & Storage Migration Script
 *
 * Prerequisites:
 *   1. Run db/migrations/schema.sql in Supabase SQL Editor first.
 *   2. Copy .env.example → .env and fill in SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node db/migrations/migrate.js
 *   OR: add values to a .env file and use: node --env-file=.env db/migrations/migrate.js
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing env vars: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
const BUCKET = 'mekkk-images'

// ── Mock data (mirrors app/stores/) ──────────────────────────────────────────

const mockProducts = [
  { id: 'sos',    name: 'Sós kecskesajt',    label: 'sós',    picsumSeed: 'kecskesajt-sos',    size: '200/200' },
  { id: 'edes',   name: 'Édes kecskesajt',   label: 'édes',   picsumSeed: 'kecskesajt-edes',   size: '200/200' },
  { id: 'kapros', name: 'Kapros kecskesajt', label: 'kapros', picsumSeed: 'kecskesajt-kapros', size: '200/200' },
  { id: 'hazi',   name: 'Házi kecskesajt',   label: 'házi',   picsumSeed: 'kecskesajt-hazi',   size: '200/200' },
  { id: 'fustolt',name: 'Füstölt kecskesajt',label: 'füstölt',picsumSeed: 'kecskesajt-fustolt',size: '200/200' },
]

const mockProducers = [
  {
    id: 'kovacs-farm',
    name: 'Kovács Farm',
    picsumSeed: 'kovacs-farm', size: '400/400',
    rating: 4.8, reviewCount: 132, deliveryMinutes: 18,
    address: '2040 Budaörs, Legelő utca 12.',
    productIds: ['sos', 'hazi'],
    popularProducts: [
      { id: 'kf-1', name: 'Sós kecskesajt',  price: 1490, description: 'Friss, kézműves sós sajt', picsumSeed: 'kf-prod-1', size: '120/120' },
      { id: 'kf-2', name: 'Házi kecskesajt', price: 1290, description: 'Lágy, natúr házisajt',     picsumSeed: 'kf-prod-2', size: '120/120' },
      { id: 'kf-3', name: 'Kecsketúró',      price:  890, description: 'Friss kecsketúró',         picsumSeed: 'kf-prod-3', size: '120/120' },
    ],
  },
  {
    id: 'zold-legelo',
    name: 'Zöld Legelő',
    picsumSeed: 'zold-legelo', size: '400/400',
    rating: 4.6, reviewCount: 87, deliveryMinutes: 24,
    address: '2073 Zsámbék, Rét út 5.',
    productIds: ['edes', 'kapros'],
    popularProducts: [
      { id: 'zl-1', name: 'Édes kecskesajt',  price: 1390, description: 'Mézes, enyhén édes sajt',    picsumSeed: 'zl-prod-1', size: '120/120' },
      { id: 'zl-2', name: 'Kapros kecskesajt',price: 1490, description: 'Friss kapros fűszerezéssel', picsumSeed: 'zl-prod-2', size: '120/120' },
    ],
  },
  {
    id: 'hegyi-majorsag',
    name: 'Hegyi Majorság',
    picsumSeed: 'hegyi-majorsag', size: '400/400',
    rating: 4.9, reviewCount: 214, deliveryMinutes: 42,
    address: '2025 Visegrád, Hegyi dűlő 3.',
    productIds: ['sos', 'kapros', 'fustolt'],
    popularProducts: [
      { id: 'hm-1', name: 'Füstölt kecskesajt', price: 1890, description: 'Bükkfán füstölve, intenzív ízű',  picsumSeed: 'hm-prod-1', size: '120/120' },
      { id: 'hm-2', name: 'Sós kecskesajt',     price: 1490, description: 'Hagyományos recept szerint',      picsumSeed: 'hm-prod-2', size: '120/120' },
      { id: 'hm-3', name: 'Kapros kecskesajt',  price: 1590, description: 'Friss kapros fűszerezéssel',      picsumSeed: 'hm-prod-3', size: '120/120' },
    ],
  },
  {
    id: 'napfeny-farm',
    name: 'Napfény Farm',
    picsumSeed: 'napfeny-farm', size: '400/400',
    rating: 4.5, reviewCount: 63, deliveryMinutes: 27,
    address: '7621 Pécs, Napfény sor 8.',
    productIds: ['edes', 'hazi', 'fustolt'],
    popularProducts: [
      { id: 'nf-1', name: 'Házi kecskesajt',    price: 1190, description: 'Egyszerű, natúr ízvilág',  picsumSeed: 'nf-prod-1', size: '120/120' },
      { id: 'nf-2', name: 'Füstölt kecskesajt', price: 1790, description: 'Enyhén füstölt változat',  picsumSeed: 'nf-prod-2', size: '120/120' },
    ],
  },
]

// ── Storage helpers ───────────────────────────────────────────────────────────

async function ensureBucket() {
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true })
  if (error && !error.message.includes('already exists')) throw error
  console.log('  ✓ Storage bucket ready')
}

async function uploadImage(picsumSeed, size, storagePath) {
  const url = `https://picsum.photos/seed/${picsumSeed}/${size}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image: ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: 'image/jpeg', upsert: true })
  if (error) throw error
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl
}

// ── Seed functions ────────────────────────────────────────────────────────────

async function seedProducts() {
  console.log('\n[Products]')
  for (const p of mockProducts) {
    process.stdout.write(`  ${p.id}... `)
    const image = await uploadImage(p.picsumSeed, p.size, `products/${p.id}.jpg`)
    const { error } = await supabase
      .from('products')
      .upsert({ id: p.id, name: p.name, label: p.label, image })
    if (error) throw error
    console.log('✓')
  }
}

async function seedProducers() {
  console.log('\n[Producers]')
  for (const p of mockProducers) {
    process.stdout.write(`  ${p.id}... `)
    const image = await uploadImage(p.picsumSeed, p.size, `producers/${p.id}.jpg`)
    const { error } = await supabase.from('producers').upsert({
      id: p.id,
      name: p.name,
      image,
      rating: p.rating,
      review_count: p.reviewCount,
      delivery_minutes: p.deliveryMinutes,
      address: p.address,
    })
    if (error) throw error

    // Junction rows
    const junctions = p.productIds.map(pid => ({ producer_id: p.id, product_id: pid }))
    const { error: jErr } = await supabase.from('producer_products').upsert(junctions)
    if (jErr) throw jErr

    // Popular products
    for (const pp of p.popularProducts) {
      const ppImage = await uploadImage(pp.picsumSeed, pp.size, `popular-products/${pp.id}.jpg`)
      const { error: ppErr } = await supabase.from('popular_products').upsert({
        id: pp.id,
        producer_id: p.id,
        name: pp.name,
        price: pp.price,
        description: pp.description,
        image: ppImage,
      })
      if (ppErr) throw ppErr
    }
    console.log('✓')
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 MEKKK migration starting...')
  await ensureBucket()
  await seedProducts()
  await seedProducers()
  console.log('\n✅ Migration complete!')
}

main().catch(err => {
  console.error('\n❌ Migration failed:', err.message)
  process.exit(1)
})
