# MEKKK Iteration 06 – Desktop Responsiveness, Advanced Filters & AI Recipes (06-prd.md)

This file describes Iteration 06 for the MEKKK Nuxt 3 mobile-first webapp.

---

## 0) Mandatory Project Guidelines

These rules apply to the entire project:

* TypeScript everywhere
* Tailwind CSS primary styling, minimal custom CSS
* No tests
* Follow existing component structure
* Mobile-first approach must remain intact
* Desktop enhancements must NOT break or visually change mobile layouts
* Use Supabase backend for all persistent data
* Pinia for global state
* No localStorage persistence
* If any ambiguity or architectural decision is unclear → **STOP AND ASK BEFORE CODING**
* Maintain consistency with previous MEKKK iterations

---

## 1) Goal

This iteration focuses on:

1. Improving desktop layout without affecting mobile UX
2. Enhancing filtering behavior and UX logic
3. Improving producer loading logic on homepage
4. Implementing rating-based filters
5. Implementing AI Recipes feature (Google Gemini 1.5 Flash + Pollinations.ai)

Mobile must remain visually unchanged except for explicitly defined behavior updates.

---

# PART A – Desktop Responsiveness Improvements

## 2) Desktop Layout Enhancements

### 2.1 Producers Grid (Desktop Only)

Current behavior:
- Producers appear one per row.

New behavior (desktop only):

* Use responsive grid:
  * `grid-cols-1` (mobile – unchanged)
  * `sm:grid-cols-2`
  * `lg:grid-cols-3`
  * `xl:grid-cols-4`
* Maximum 4 producers per row on large screens
* Spacing consistent with existing design system
* Cards remain same visual style as mobile

### 2.2 Producer Images (Desktop Fix)

Problem:
- Top of image is cut off on desktop.

Fix:
* Ensure images use `object-cover` with proper container ratio
* Adjust container aspect ratio to ensure top portion is visible
* Do NOT change mobile image behavior

---

## 3) Producer Product Grid (Desktop Only)

When opening a producer:

Current:
- Products stacked vertically.

New (desktop only):
* Same responsive grid logic:
  * `grid-cols-1` mobile
  * `sm:grid-cols-2`
  * `lg:grid-cols-3`
  * `xl:grid-cols-4`
* Dynamic responsiveness based on screen width
* Maintain mobile layout exactly as before

---

## 4) "Visszaállítás" Button Alignment (Desktop Only)

Current:
- Reset button aligned to far right.

New behavior:
* On desktop:
  * "Visszaállítás" appears next to counter (not right-aligned)
* On mobile:
  * Keep current layout unchanged

Use responsive Tailwind utilities (`md:` or `lg:`) to control behavior.

---

# PART B – Producer Loading Logic Improvements (Mobile + Desktop)

## 5) Homepage Producer Auto-Loading

Current:
- Producers load only after selecting a product (e.g., Kecskesajt).

New behavior:

* On initial homepage load:
  * All producers must load automatically
  * No filter required

## 6) Product Selection Filtering Logic

When selecting a product:

* Producers list filters to only those offering that product

When clicking the SAME product again:

* Product becomes unselected
* Filter resets
* All producers reload

This must work consistently on mobile and desktop.

---

# PART C – Rating Filters

## 7) Rename Existing Filter

Current:
- "Legmagasabb értékelésről"

New:
- Rename to: **Értékelés**
- Add green "v" icon (same style as sorting dropdown)
- Clicking opens modal identical in structure to sorting modal

---

## 8) Értékelés Modal (Rating Threshold Filter)

Modal behavior:

### Layout

Top:
- Title: **Értékelés**

Below:
- Horizontal slider with 5 states:
  - 3+
  - 3,5+
  - 4+
  - 4,5+
  - 5 (exactly 5)

Above slider show labels:

- 3 felett
- 3,5 felett
- 4 felett
- 4,5 felett
- pontosan 5

### Buttons (same behavior as sorting modal)

* **Alkalmaz**
  * Applies filter
  * Closes modal
  * Filter becomes active
  * Filter label updates dynamically:
    - "3 felett"
    - "3,5 felett"
    - etc.
* **Visszaállít**
  * Clears filter
  * Closes modal
  * Filter becomes inactive

### Filtering Logic

* Filters producers by average rating threshold
* 5 means EXACTLY 5.0 only
* Others mean >= threshold

---

## 9) New Filter – Legtöbb értékelés

Add new filter:

Label:
- **Legtöbb értékelés**

Behavior:
* If active:
  * Only show producers with 100+ total ratings
  * Rating quality irrelevant
* Toggle-style filter
* Works independently of rating threshold filter
* Must combine logically with other active filters

---

# PART D – AI Recipes Feature Implementation

## 10) Location

Hamburger Menu → AI receptek

Replace placeholder with full implementation.

---

## 11) Cheese Selection Screen

Layout:

* Display cheeses same way as dashboard
* Responsive grid (same as producers logic)
* Title at top:
  - **Válassz maximum 3 kecskesajtot**

Selection logic:

* Max 3 selectable
* Selected items visually highlighted
* Disable further selection after 3 chosen

Below selection:
* Button:
  - **Recept generálása**
  - Disabled until at least 1 cheese selected

---

## 12) Recipe Generation Flow

On button click:

### 12.1 AI Recipe Generation

Use:
- Google Gemini 1.5 Flash

Requirements:

* Generate recipe in Hungarian
* Include:
  - Recipe title
  - Short description
  - Ingredients list
  - Step-by-step instructions
* Prompt must include selected cheese names

### 12.2 Image Generation

Use:
- Pollinations.ai

* Generate realistic food image based on recipe
* Image displayed above recipe text

---

## 13) Loading Animation

While generating:

* Show animated loader
* Text example:
  - "Recept generálása..."
* Optional subtle pulse or shimmer animation
* Prevent multiple submissions

---

## 14) Data Handling

* No recipe persistence required
* No storage in Supabase
* Pure runtime generation
* API keys handled via server route (NOT exposed client-side)

---

# PART E – UX & State Rules

* All filters combine correctly
* Resetting one filter does not break others
* Mobile layout visually unchanged except:
  - Auto-loading producers
  - Updated filter logic
* Desktop layout improved but consistent
* AI flow clean and intuitive
* No layout shift during loading

---

# Acceptance Criteria

* Producers load immediately on homepage
* Product toggle resets correctly
* Desktop grid shows up to 4 items per row
* Image top visible on desktop
* Reset button aligned next to counter on desktop only
* Rating modal works with slider
* Rating filter label updates dynamically
* Legtöbb értékelés filter shows only 100+ rating producers
* Filters combine correctly
* AI receptek fully functional
* Recipe generated in Hungarian
* Image generated and displayed
* Loading animation visible
* No mobile layout regressions

---

# Definition of Done

* Desktop responsive grids implemented
* No visual regression on mobile
* All filters working
* AI generation working via server-side route
* Supabase remains source of truth
* Pinia state correctly manages filters and selections
* Clean component structure
* No duplication
* Code consistent with previous iterations

---

# TASK

1. Read fully
2. Refactor layouts for responsive desktop support
3. Update producer loading logic
4. Implement rating filters and modal
5. Add Legtöbb értékelés filter
6. Implement full AI receptek flow
7. Use server routes for AI integrations
8. Maintain mobile-first integrity
9. Ensure filter combination logic is correct
10. If any ambiguity → STOP AND ASK BEFORE CODING