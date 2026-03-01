# MEKKK Iteration 08 – AI Recipes Layout Optimization & Notes Modal Fix (08-prd.md)

This file describes Iteration 08 for the MEKKK Nuxt 3 mobile-first webapp.

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

---

# PART A – AI Recepek Layout Optimization (Mobile)

## 1) Goal

Improve mobile layout of AI Recepek cheese selection screen so:

* 3 cheeses fit in one row
* Images are smaller
* "Recept generálása" button is visible without scrolling (when screen height allows)

---

## 2) Cheese Grid Layout (Mobile Only)

Current:
* Larger cards
* Fewer items per row

New (mobile only):

* Use grid:
  * `grid-cols-3`
* Reduce image size proportionally
* Maintain square or consistent aspect ratio
* Reduce vertical spacing between rows slightly
* Keep selection highlight behavior unchanged
* Keep desktop layout unchanged

---

## 3) Button Visibility Requirement

On standard mobile viewport (e.g. ~800px height):

* 3 cheeses per row
* At least one full row visible
* "Recept generálása" button visible without scrolling
* No layout overflow
* No horizontal scroll

If screen height smaller, normal scrolling allowed.

---

# PART B – Rendelésed → Megjegyzések Modal Fix

## 4) Mobile Notes Modal Bug Fix

Current bug:
* Notes modal renders BEHIND the Rendelésed view
* Not visible until closed

Required fix:

* Notes modal must render above Rendelésed
* Use proper stacking:
  * `fixed`
  * `inset-0`
  * high `z-index` (higher than OrderDrawer)
* Consider using `<Teleport to="body">`
* Ensure no parent overflow clipping

Behavior:

* Modal fully visible
* Background interaction disabled
* No visual glitch

---

## 5) Desktop Notes Modal Behavior Update

Current:
* Notes modal takes full screen

New requirement (desktop only):

* Notes modal must render INSIDE the Rendelésed desktop panel
* It must NOT cover the entire page
* It behaves like a modal inside the right-side drawer

Desktop behavior:

* Width constrained to drawer width (~w-1/4 of screen)
* Height full drawer height
* Slides in from right inside drawer
* Does not affect underlying main page

Mobile behavior remains full-screen.

---

# UX & Technical Rules

* No mobile regression
* No stacking issues
* Notes modal always above order drawer on mobile
* Desktop modal contained within drawer context
* Animations consistent with previous transitions
* No layout shift during modal open/close

---

# Acceptance Criteria

* AI Recepek shows 3 cheeses per row on mobile
* Images smaller
* Generate button visible without scroll (standard viewport)
* No desktop regression in AI screen
* Notes modal visible correctly on mobile
* No rendering behind order drawer
* Desktop notes modal limited to drawer width
* All transitions smooth

---

# Definition of Done

* Grid adjusted
* Button visibility verified on mobile
* Z-index issue fixed
* Teleport or stacking solution implemented
* Desktop modal properly constrained
* No UI regression
* Clean component structure maintained

---

# TASK

1. Read fully
2. Refactor AI Recepek mobile grid
3. Adjust image sizing
4. Ensure button visibility
5. Fix mobile notes modal stacking issue
6. Constrain desktop notes modal to drawer
7. Verify no regressions
8. If ambiguity → STOP AND ASK BEFORE CODING