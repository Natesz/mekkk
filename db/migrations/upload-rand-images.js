/**
 * MEKKK – Upload rand- producer images (Iteration 09)
 *
 * Uploads new rand-XX images from public/pictures/ to Supabase Storage
 * (mekkk-images bucket, producers/ folder) and updates the producers table
 * image URL for each matching producer.
 *
 * Usage:
 *   node db/migrations/upload-rand-images.js
 *   OR: node --env-file=.env db/migrations/upload-rand-images.js
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, extname } from 'path'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
const BUCKET = 'mekkk-images'

// rand- images in public/pictures/ and their matching producer IDs
const RAND_IMAGES = [
  { producerId: 'rand-01', file: 'rand-01.jpg' },
  { producerId: 'rand-02', file: 'rand-02.jpg' },
  { producerId: 'rand-04', file: 'rand-04.jpg' },
  { producerId: 'rand-06', file: 'rand-06.jpg' },
  { producerId: 'rand-10', file: 'rand-10.jpg' },
  { producerId: 'rand-11', file: 'rand-11.avif' },
  { producerId: 'rand-15', file: 'rand-15.avif' },
  { producerId: 'rand-17', file: 'rand-17.avif' },
  { producerId: 'rand-18', file: 'rand-18.jpg' },
  { producerId: 'rand-20', file: 'rand-20.jpg' },
]

function contentType(filename) {
  const ext = extname(filename).toLowerCase()
  if (ext === '.avif') return 'image/avif'
  return 'image/jpeg'
}

async function run() {
  console.log('Uploading rand- producer images...\n')

  for (const { producerId, file } of RAND_IMAGES) {
    const localPath = join('public/pictures', file)

    if (!existsSync(localPath)) {
      console.warn(`  ⚠  File not found, skipping: ${localPath}`)
      continue
    }

    process.stdout.write(`  ${producerId} (${file})... `)

    const buffer = readFileSync(localPath)
    const storagePath = `producers/${file}`
    const mime = contentType(file)

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, buffer, { contentType: mime, upsert: true })

    if (uploadError) {
      console.error(`\n  ❌  Upload failed: ${uploadError.message}`)
      continue
    }

    const publicUrl = supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl

    const { error: dbError } = await supabase
      .from('producers')
      .update({ image: publicUrl })
      .eq('id', producerId)

    if (dbError) {
      console.error(`\n  ❌  DB update failed: ${dbError.message}`)
      continue
    }

    console.log(`✓  ${publicUrl}`)
  }

  console.log('\nDone.')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
