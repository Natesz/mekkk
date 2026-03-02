# MEKKK Iteration 09 – AI Image Optimization, Orders Persistence & Asset Updates (09-prd.md)

This file describes Iteration 09 for the MEKKK Nuxt mobile-first webapp.

---

## 0) Mandatory Project Guidelines

These rules apply to the entire project:

* TypeScript everywhere
* Tailwind CSS primary styling, minimal custom CSS
* No tests
* Follow existing component structure
* Mobile-first approach must remain intact
* Desktop enhancements must NOT break mobile layouts unless explicitly defined
* Use Supabase backend for all persistent data
* Pinia for global state
* No localStorage persistence
* If any ambiguity → **STOP AND ASK BEFORE CODING**
* Maintain consistency with previous MEKKK iterations
* API keys must remain server-side only

---

# PART A – AI Image Generation Optimization

## 1) Problem

On mobile devices:

* AI-generated images sometimes fail
* Occasionally error message appears
* Likely due to too high image resolution

---

## 2) New Image Generation Requirements

When generating recipe images:

* Reduce resolution to moderate size
* Target resolution example:
  * ~512x512 OR
  * ~768x768 max
* Must remain visually high quality
* Avoid large payload sizes
* Ensure stable generation on mobile networks

---

## 3) Performance & Error Handling

* If image generation fails:
  * Show fallback message:
    - "A kép generálása nem sikerült, de a recept elkészült."
* Recipe text must always render even if image fails
* Prevent UI freeze during generation
* Keep loading animation behavior unchanged

---

# PART B – Text & Typo Fixes

## 4) Typo Corrections

Fix the following:

* "paradicsmos" → **paradicsomos**

Applies to:
* Product titles
* Product descriptions
* Anywhere else in UI

---

## 5) Dashboard Product Name Truncation Fix

Current:
* Dashboard product card shows:
  - "paradics..."

New:

* "paradicsomos" must display fully
* Remove forced truncation for this product
* Ensure no layout break
* If needed, adjust font size slightly but keep design consistent

---

# PART C – Orders Persistence After Payment

## 6) Orders Table in Supabase

Create new table:

### Table: `orders`

Fields:

* id (uuid, primary key)
* created_at (timestamp, default now())
* producer_id (foreign key)
* producer_name (optional cached value)
* total_amount (numeric)
* items (jsonb)
  - list of products
  - product id
  - name
  - quantity
  - price
* customer_name (nullable, only if available from Barion)

---

## 7) When to Insert Order

After successful payment confirmation from Barion:

* Create new row in `orders`
* Insert:
  - timestamp
  - producer
  - total
  - selected products
  - name (only if retrievable)

If Barion does NOT provide name:
* customer_name remains null
* Do not block order creation

---

# PART D – Korábbi rendeléseim Page

## 8) Navigation

Top-right profile icon:

* On click:
  * Navigate to: `/korabbi-rendeleseim`

---

## 9) Korábbi rendeléseim Page Layout

List orders from Supabase.

Each order displayed as card:

### Card Structure

Top:

* If customer_name exists:
  - Show name at top
* Otherwise:
  - Show producer name at top

Below:

Left:
* Timestamp (formatted human-readable)

Right:
* Total amount (right aligned)

If producer shown below name:
* Show producer under name
* Then timestamp row

---

## 10) Sorting

* Newest orders first
* Order by created_at DESC

---

## 11) Empty State

If no orders:

* Show:
  - "Még nincsenek rendeléseid."
* Button:
  - "Vissza a főoldalra"

---

# PART E – Asset Updates

## 12) Replace Product Images

In `/public/pictures`:

* New images with prefix:
  - `rand-`

Requirement:

* Upload these images to Supabase Storage
* Replace existing product image references
* Update database image URLs
* Remove old image references if unused

Supabase remains single source of truth for images.

---

## 13) Logo4 Background Fix

Current issue:

* logo4 has white square background
* Should only show green circle with white goat

Requirement:

* If possible:
  * Remove white background (transparent PNG)
  OR
  * Mask image via CSS to show only circular area
* Background behind logo must blend with page
* No visible white square

Must work on:
* Mobile
* Desktop

---

# UX & Technical Rules

* No regression in AI flow
* Orders insertion must not duplicate entries
* Ensure payment confirmation validated before insert
* Orders page must be responsive
* Profile icon navigation must not break existing layout
* Supabase schema must match TypeScript types

---

# Acceptance Criteria

* AI images generate reliably on mobile
* Image resolution reduced but still sharp
* Fallback message works on failure
* All typos fixed
* "paradicsomos" fully visible on dashboard
* Orders table created in Supabase
* Successful payments create order entry
* Profile icon navigates to orders page
* Orders page displays correct data
* Orders sorted newest first
* Empty state handled
* New rand- images used
* logo4 background fixed
* No mobile regression

---

# Definition of Done

* AI image resolution optimized
* Error handling added
* Typos removed
* Orders table live in Supabase
* Insert logic implemented post-payment
* Orders page implemented
* Asset migration completed
* Logo visually corrected
* Clean component separation
* No ambiguity unresolved

---

# TASK

1. Read fully
2. Reduce AI image resolution
3. Add fallback handling
4. Fix typos and truncation
5. Create orders table in Supabase
6. Insert order after successful payment
7. Implement Korábbi rendeléseim page
8. Wire profile icon navigation
9. Upload rand- images to Supabase
10. Replace image references
11. Fix logo background issue
12. Verify no regressions
13. If ambiguity → STOP AND ASK BEFORE CODING