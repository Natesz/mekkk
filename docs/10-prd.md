# MEKKK Patch Iteration 10 – Filter Persistence, Header Updates & Dashboard Spacing Refinement (10-prd.md)

This file describes Patch Iteration 10 for the MEKKK Nuxt 3 mobile-first webapp.

---

## 0) Mandatory Project Guidelines

These rules apply to the entire project:

* TypeScript everywhere
* Tailwind CSS primary styling, minimal custom CSS
* No tests
* Follow existing component structure
* Mobile-first approach must remain intact
* Desktop must not regress
* Use Supabase backend for all persistent data
* Pinia for global state
* No localStorage persistence
* If any ambiguity → **STOP AND ASK BEFORE CODING**
* Maintain consistency with previous MEKKK iterations
* No UI breaking changes

---

# PART A – Dashboard Filter Persistence

## 1) Problem

Currently:

* User selects a product on Dashboard
* Sets a filter (e.g. “30 percen belül”)
* Switches to another product
* Filter resets / disappears

This breaks UX continuity.

---

## 2) Required Behavior

When switching between products:

* Active filter must remain applied
* Filter state must NOT reset
* Filter must persist during:
  - Product switching
  - Producer switching
  - Counter updates
* Filter resets ONLY when:
  - User manually changes it
  - Page fully reloaded

---

## 3) Technical Requirement

* Store filter state in Pinia (if not already)
* Product change must not mutate filter state
* Avoid local component-level filter state resets
* Ensure no unintended watcher resets

---

## 4) Acceptance Criteria

* Switch between products → filter remains active
* No UI flicker
* No layout regression
* Filtering logic continues to work correctly

---

# PART B – Hamburger Menu Logo Styling Fix

## 5) Problem

When opening hamburger menu (top-left):

* Logo appears
* Grey square background visible
* Styling inconsistent with centered dashboard logo

---

## 6) Required Behavior

Hamburger menu logo must:

* Use same styling approach as dashboard header logo
* No visible grey square background
* Background must blend with page
* If necessary:
  - Use transparent background
  - Or apply proper masking / object-fit
  - Or consistent container background

Must match visual treatment of:

* Centered top dashboard logo

---

## 7) Acceptance Criteria

* No grey box visible
* Logo looks visually identical (styling-wise) to dashboard header version
* Works on mobile and desktop
* No layout shifts

---

# PART C – Replace Profile Icon

## 8) Current

Top-right icon:
* Profile icon

---

## 9) New Requirement

Replace profile icon with:

* Green cart icon

Specifications:

* Icon color: green (brand-consistent)
* Same clickable area size
* Same positioning
* Same navigation behavior (to orders page)
* Hover / tap states remain consistent

---

## 10) Acceptance Criteria

* Profile icon removed
* Green cart icon visible
* Navigation unchanged
* No header layout shift

---

# PART D – Dashboard Vertical Spacing Compression

## 11) Goal

Slightly reduce vertical spacing between major dashboard sections:

Order of elements:

1. Logo
2. Termékek (kecskesajtok)
3. Szűrő
4. Counter
5. Termelők

Currently:
* Spacing feels too large

---

## 12) Required Adjustment

Reduce vertical spacing slightly:

* Decrease margins (`mt`, `mb`, `space-y`)
* Reduce section padding if needed
* Keep visual clarity
* DO NOT modify:
  - Product-to-product spacing inside grid
  - Internal card spacing
  - Counter button spacing

This is a **section-level compression only**.

---

## 13) Important Constraints

* UI must NOT:
  - Overlap
  - Collapse
  - Break on small screens
  - Cause wrapping issues
* Maintain mobile-first layout
* Maintain desktop layout integrity
* Maintain readable hierarchy
* Preserve consistent rhythm

Target:
* Subtle tightening
* Not drastic compression
* Clean and intentional look

---

## 14) Explicit Non-Changes

Do NOT change:

* Product card spacing between each other
* Grid layout
* Font sizes
* Button sizes
* Filter component internal layout

---

# UX Integrity Requirements

* No regression in filter behavior
* No layout breaking on mobile
* No element overlapping
* No z-index issues
* No header height shifts
* Clean visual hierarchy preserved

---

# Acceptance Criteria

* Filter persists when switching products
* Hamburger menu logo visually consistent
* No grey square visible
* Profile icon replaced with green cart icon
* Dashboard elements slightly closer vertically
* Product grid spacing unchanged
* No UI breakage
* Mobile and desktop verified

---

# Definition of Done

* Filter state centralized and stable
* Header icon replaced
* Logo styling unified
* Vertical spacing refined
* No regressions
* Clean Tailwind-based solution
* Code remains maintainable and consistent

---

# TASK

1. Ensure filter state persistence via Pinia
2. Remove unintended filter resets
3. Style hamburger menu logo like dashboard logo
4. Replace profile icon with green cart icon
5. Slightly reduce dashboard vertical spacing
6. Verify mobile layout integrity
7. Verify desktop layout integrity
8. If ambiguity → STOP AND ASK BEFORE CODING