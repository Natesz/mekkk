/**
 * MEKKK – PRD 05 Migration Script
 *
 * - Adds price + description to all 10 products
 * - Sets product_id on popular_products (for deduplication in "További termékek")
 *
 * Prerequisites (run once in Supabase SQL Editor):
 *   ALTER TABLE products ADD COLUMN IF NOT EXISTS price INTEGER NOT NULL DEFAULT 0;
 *   ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '';
 *   ALTER TABLE popular_products ADD COLUMN IF NOT EXISTS product_id TEXT REFERENCES products(id) ON DELETE SET NULL;
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node db/migrations/update-products.js
 *   OR: node --env-file=.env db/migrations/update-products.js
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// ── Product data ───────────────────────────────────────────────────────────────

const PRODUCT_DATA = {
  borsos:     { price: 1790, description: 'Fekete borssal fűszerezett, enyhén pikáns kézműves kecskesajt.' },
  csipos:     { price: 1890, description: 'Erős paprikával ízesített, bátor és csípős ízvilág.' },
  edes:       { price: 1490, description: 'Mézzel vagy gyümölcsökkel ízesített, desszertnek is kiváló változat.' },
  fustolt:    { price: 1890, description: 'Bükkfán füstölt, intenzív aromájú hagyományos kézműves sajt.' },
  garnela:    { price: 1990, description: 'Mediterrán ihletű, friss garnélarákkal kombinált különlegesség.' },
  hazi:       { price: 1290, description: 'Egyszerű, natúr receptúra minimális adalékanyaggal, tiszta ízvilág.' },
  kapros:     { price: 1690, description: 'Friss kaporral ízesített, nyárias és könnyű ízprofil.' },
  paradicsom: { price: 1490, description: 'Szárított paradicsommal készített, gazdagon ízesített mediterrán sajt.' },
  sos:        { price: 1590, description: 'Friss, enyhén sós ízvilág, krémes és könnyű állag.' },
  spenot:     { price: 1590, description: 'Friss spenóttal kevert, zöldes árnyalatú kézműves kecskesajt.' },
}

// popular_product id → product table id mapping
const PP_PRODUCT_MAP = {
  'maria-pp-1':   'sos',
  'maria-pp-2':   'kapros',
  'maria-pp-3':   'borsos',
  'hegedus-pp-1': 'fustolt',
  'hegedus-pp-2': 'hazi',
  'hegedus-pp-3': 'edes',
  'zsolt-pp-1':   'garnela',
  'zsolt-pp-2':   'spenot',
  'zsolt-pp-3':   'csipos',
  'dominik-pp-1': 'paradicsom',
  'dominik-pp-2': 'garnela',
  'dominik-pp-3': 'kapros',
  'dzsoki-pp-1':  'sos',
  'dzsoki-pp-2':  'edes',
  'dzsoki-pp-3':  'spenot',
}

// ── Steps ──────────────────────────────────────────────────────────────────────

async function updateProducts() {
  console.log('\n[1/2] Updating products with price + description...')
  for (const [id, data] of Object.entries(PRODUCT_DATA)) {
    process.stdout.write(`  ${id}... `)
    const { error } = await supabase
      .from('products')
      .update({ price: data.price, description: data.description })
      .eq('id', id)
    if (error) throw new Error(`products update failed for ${id}: ${error.message}`)
    console.log('✓')
  }
}

async function updatePopularProducts() {
  console.log('\n[2/2] Setting product_id on popular_products...')
  for (const [ppId, productId] of Object.entries(PP_PRODUCT_MAP)) {
    process.stdout.write(`  ${ppId} → ${productId}... `)
    const { error } = await supabase
      .from('popular_products')
      .update({ product_id: productId })
      .eq('id', ppId)
    if (error) throw new Error(`popular_products update failed for ${ppId}: ${error.message}`)
    console.log('✓')
  }
}

async function main() {
  console.log('🚀 MEKKK update-products starting...')
  await updateProducts()
  await updatePopularProducts()
  console.log('\n✅ Update complete!')
}

main().catch(err => {
  console.error('\n❌ Failed:', err.message)
  process.exit(1)
})
