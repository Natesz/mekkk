-- ─────────────────────────────────────────────────────────────────────────────
-- MEKKK – Supabase Database Schema
-- Run this in the Supabase SQL Editor before running the migration script.
-- ─────────────────────────────────────────────────────────────────────────────

-- Products (cheese types shown in the carousel)
CREATE TABLE IF NOT EXISTS products (
  id               TEXT        PRIMARY KEY,
  name             TEXT        NOT NULL,
  label            TEXT        NOT NULL,
  image            TEXT,
  price            INTEGER     NOT NULL DEFAULT 0,
  description      TEXT        NOT NULL DEFAULT '',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- If upgrading an existing database, run:
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS price INTEGER NOT NULL DEFAULT 0;
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '';

-- Producers
CREATE TABLE IF NOT EXISTS producers (
  id               TEXT        PRIMARY KEY,
  name             TEXT        NOT NULL,
  image            TEXT,
  rating           NUMERIC(3,1) NOT NULL DEFAULT 0,
  review_count     INTEGER      NOT NULL DEFAULT 0,
  delivery_minutes INTEGER      NOT NULL DEFAULT 0,
  address          TEXT         NOT NULL DEFAULT '',
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Producer <-> Product junction table (many-to-many)
CREATE TABLE IF NOT EXISTS producer_products (
  producer_id  TEXT NOT NULL REFERENCES producers(id) ON DELETE CASCADE,
  product_id   TEXT NOT NULL REFERENCES products(id)  ON DELETE CASCADE,
  PRIMARY KEY (producer_id, product_id)
);

-- Popular products shown on a producer's detail page
CREATE TABLE IF NOT EXISTS popular_products (
  id           TEXT        PRIMARY KEY,
  producer_id  TEXT        NOT NULL REFERENCES producers(id) ON DELETE CASCADE,
  product_id   TEXT        REFERENCES products(id) ON DELETE SET NULL,
  name         TEXT        NOT NULL,
  price        INTEGER     NOT NULL,
  description  TEXT,
  image        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- If upgrading an existing database, run:
-- ALTER TABLE popular_products ADD COLUMN IF NOT EXISTS product_id TEXT REFERENCES products(id) ON DELETE SET NULL;

-- ── updated_at auto-trigger ───────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_products_updated_at       ON products;
DROP TRIGGER IF EXISTS set_producers_updated_at      ON producers;
DROP TRIGGER IF EXISTS set_popular_products_updated_at ON popular_products;

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_producers_updated_at
  BEFORE UPDATE ON producers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_popular_products_updated_at
  BEFORE UPDATE ON popular_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Row Level Security (public read, no write from frontend) ──────────────────

ALTER TABLE products          ENABLE ROW LEVEL SECURITY;
ALTER TABLE producers         ENABLE ROW LEVEL SECURITY;
ALTER TABLE producer_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE popular_products  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read products"          ON products          FOR SELECT USING (true);
CREATE POLICY "public read producers"         ON producers         FOR SELECT USING (true);
CREATE POLICY "public read producer_products" ON producer_products FOR SELECT USING (true);
CREATE POLICY "public read popular_products"  ON popular_products  FOR SELECT USING (true);
