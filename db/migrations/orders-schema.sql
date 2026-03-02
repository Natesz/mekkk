-- ─────────────────────────────────────────────────────────────────────────────
-- MEKKK – Orders Schema (Iteration 09)
-- Run this in the Supabase SQL Editor.
-- ─────────────────────────────────────────────────────────────────────────────

-- pending_orders: temporary storage created before Barion redirect,
-- confirmed/deleted by the webhook on successful payment.
CREATE TABLE IF NOT EXISTS pending_orders (
  payment_id    TEXT        PRIMARY KEY,
  producer_id   TEXT,
  producer_name TEXT,
  total_amount  NUMERIC     NOT NULL,
  items         JSONB       NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- orders: confirmed, persisted orders after successful Barion payment.
CREATE TABLE IF NOT EXISTS orders (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  producer_id   TEXT,
  producer_name TEXT,
  total_amount  NUMERIC     NOT NULL,
  items         JSONB       NOT NULL,
  customer_name TEXT
);

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE pending_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders         ENABLE ROW LEVEL SECURITY;

-- Public read for orders (korabbi-rendeleseim page uses anon key)
CREATE POLICY "public read orders" ON orders FOR SELECT USING (true);

-- pending_orders: no public access (service_role bypasses RLS for INSERT/DELETE)

-- ── Fix typo in existing data ─────────────────────────────────────────────────

UPDATE products
  SET name = 'Paradicsomos kecskesajt', label = 'paradicsomos'
  WHERE id = 'paradicsom';

UPDATE popular_products
  SET name = 'Paradicsomos kecskesajt'
  WHERE name = 'Paradicsmos kecskesajt';
