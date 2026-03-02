-- ─────────────────────────────────────────────────────────────────────────────
-- MEKKK – producer_products: max 3 termék/termelő
-- Kihagyva: maria, dominik, zsolt (már meglévő, bővebb linkjeik vannak)
-- ON CONFLICT DO NOTHING = nem felülír, csak hiányzókat szúr be
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO producer_products (producer_id, product_id) VALUES
  -- hegedus
  ('hegedus', 'borsos'),
  ('hegedus', 'edes'),
  ('hegedus', 'fustolt'),

  -- dzsoki
  ('dzsoki', 'borsos'),
  ('dzsoki', 'edes'),
  ('dzsoki', 'fustolt'),

  -- rand-01
  ('rand-01', 'borsos'),
  ('rand-01', 'csipos'),
  ('rand-01', 'edes'),

  -- rand-02
  ('rand-02', 'paradicsom'),
  ('rand-02', 'sos'),
  ('rand-02', 'spenot'),

  -- rand-03
  ('rand-03', 'garnela'),
  ('rand-03', 'hazi'),
  ('rand-03', 'kapros'),

  -- rand-04
  ('rand-04', 'csipos'),
  ('rand-04', 'edes'),
  ('rand-04', 'fustolt'),

  -- rand-05
  ('rand-05', 'sos'),
  ('rand-05', 'spenot'),
  ('rand-05', 'borsos'),

  -- rand-06
  ('rand-06', 'hazi'),
  ('rand-06', 'kapros'),
  ('rand-06', 'paradicsom'),

  -- rand-07
  ('rand-07', 'edes'),
  ('rand-07', 'fustolt'),
  ('rand-07', 'garnela'),

  -- rand-08
  ('rand-08', 'spenot'),
  ('rand-08', 'borsos'),
  ('rand-08', 'csipos'),

  -- rand-09
  ('rand-09', 'kapros'),
  ('rand-09', 'paradicsom'),
  ('rand-09', 'sos'),

  -- rand-10
  ('rand-10', 'fustolt'),
  ('rand-10', 'garnela'),
  ('rand-10', 'hazi'),

  -- rand-11
  ('rand-11', 'borsos'),
  ('rand-11', 'csipos'),
  ('rand-11', 'edes'),

  -- rand-12
  ('rand-12', 'paradicsom'),
  ('rand-12', 'sos'),
  ('rand-12', 'spenot'),

  -- rand-13
  ('rand-13', 'garnela'),
  ('rand-13', 'hazi'),
  ('rand-13', 'kapros'),

  -- rand-14
  ('rand-14', 'csipos'),
  ('rand-14', 'edes'),
  ('rand-14', 'fustolt'),

  -- rand-15
  ('rand-15', 'sos'),
  ('rand-15', 'spenot'),
  ('rand-15', 'borsos'),

  -- rand-16
  ('rand-16', 'hazi'),
  ('rand-16', 'kapros'),
  ('rand-16', 'paradicsom'),

  -- rand-17
  ('rand-17', 'edes'),
  ('rand-17', 'fustolt'),
  ('rand-17', 'garnela'),

  -- rand-18
  ('rand-18', 'spenot'),
  ('rand-18', 'borsos'),
  ('rand-18', 'csipos'),

  -- rand-19
  ('rand-19', 'kapros'),
  ('rand-19', 'paradicsom'),
  ('rand-19', 'sos'),

  -- rand-20
  ('rand-20', 'fustolt'),
  ('rand-20', 'garnela'),
  ('rand-20', 'hazi')

ON CONFLICT DO NOTHING;
