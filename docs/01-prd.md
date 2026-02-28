# Project Specification – Iteration 1 (Homepage: Kecskesajt Overview)

This file describes the first iteration of the MEKKK webapp homepage.

---

## 0) General Guidelines

- **Mobile-first approach**: optimize for small screens; horizontal scrolling for top product list
- **Nuxt 4 + Tailwind CSS**: green branding, rounded buttons, inputs, dropdowns
- **LocalStorage persistence**: for mock data; later iterations (2–3) migrate to Supabase
- Use **mock data** for initial products and producers
- All changes must update `docs/backlog.homepage.md` after iteration completion

---

## 1) Homepage Layout

### Top Products Carousel

- Displayed at the **top of the page** in a horizontal scrollable row
- Product images are **circular**, slightly cropped if needed
- Images have a **green square background** behind them, corners rounded
- Selecting a product:
  - Highlights its image with green background (animated)
  - Shows **associated producers** below the product row
  - Only one product selected at a time; changing selection updates green highlight
- **Reset button** (Hungarian: “Alaphelyzet” or “Visszaállítás”) clears selection, hides producers, removes green background

### Product Labels

- Below product images, show **short labels**: e.g., “sós”, “édes”, “kapros”, “házi”
- Keep text concise to prevent overflow

---

## 2) Producers Display

- Appears **below selected product** row
- For each producer:
  - Circular image
  - Name displayed underneath
  - Rating with **green star** and count in parentheses
  - Delivery time (mock value for now)
- Above producer list: display **number of results found**
- Images clickable → navigates to producer detail page

---

## 3) Producer Detail Page

- Displays **selected producer** in larger image at top, full mobile width
- Producer name with larger font
- Rating with green star + review count
- Address displayed (mock for iteration 1)
- **Delivery method toggle** (oval slider):
  - Left: “Kiszállítás” (active by default)
  - Right: “Átvétel” (toggles delivery method)
- Below, a **“Most Popular”** section:
  - Product list with:
    - Left side: product name, price, short description
    - Right side: square image, slightly rounded corners

---

## 4) Animations and UX

- Green highlight for product selection appears with **minimal animation**
- Removing selection (reset or switching product) also animates out
- Horizontal scroll on mobile for top product row
- Only one producer list visible per selected product

---

## 5) Notes / Mock Data

- Use temporary placeholder data for:
  - Product images, names, short labels, prices
  - Producer images, names, ratings, delivery time, address
- Layout and animations should work **without database** for now
- Future iterations will load real data from Supabase

---

## Mandatory Rules (from docs/claude.md)

- Ask before coding if any decision point exists (auth, data models, UI flows, etc.)
- List **3–7 bullet points** of changes before implementing
- **No tests** — delete any that appear
- Tailwind-first styling; minimal custom CSS
- Update `docs/backlog.homepage.md` after completing this iteration