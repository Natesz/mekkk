# MEKKK Iteration 07 – Rendelésed Flow & Order Drawer/Modal (07-prd.md)

This file describes Iteration 07 for the MEKKK Nuxt 3 mobile-first webapp.

---

## 0) Mandatory Project Guidelines

These rules apply to the entire project:

* TypeScript everywhere
* Tailwind CSS primary styling, minimal custom CSS
* No tests
* Follow existing component structure
* Mobile-first approach must remain intact
* Desktop enhancements must NOT break or visually change mobile layouts unless explicitly defined
* Use Supabase backend for all persistent data
* Pinia for global state (order state lives here)
* No localStorage persistence
* If any ambiguity or architectural decision is unclear → **STOP AND ASK BEFORE CODING**
* Maintain consistency with previous MEKKK iterations

---

## 1) Goal

Fully implement the **Rendelés megtekintése → Rendelésed** flow:

* Functional order review screen
* Editable quantities inside order view
* Notes (Megjegyzés) system with full-screen modal
* Desktop modal behavior
* Persistent order state (via Pinia)
* Checkout button (navigation only, payment in next iteration)
* Minor AI Recipes UI refinement

---

# PART A – Navigation & Layout Behavior

## 2) "Rendelés megtekintése" Button Behavior

Current:
* Bottom green bar appears when at least one product selected
* Button does not navigate anywhere

New behavior:

* Clicking **Rendelés megtekintése** navigates to **Rendelésed** view

### Layout behavior:

#### Mobile:
* Full-screen page
* Slides in from right (same transition pattern as other page-level transitions)

#### Desktop:
* Right-side modal
* Slides in from right
* Width: approx. 25% of screen (`w-1/4`)
* Underlying page remains visible
* Closing modal does NOT reset order state

---

## 3) Close Behavior

### Mobile:
Top-right corner:
* **X button**
* Navigates back to producer page
* Order state preserved

### Desktop:
Top-right corner:
* **X button**
* Closes modal only
* Order state preserved

---

# PART B – Rendelésed Layout Structure

## 4) Header Section

Top-right:
* X button

Below slightly lower, left aligned:
* Title: **Rendelésed**

---

## 5) Ordered Products List

For each selected product:

### Layout (Mobile-first):

* Left:
  * Product image
  * Smaller than usual
  * Approx. 25% of screen width on mobile
* Center:
  * Product name (bold)
  * Below name: price
* Right:
  * Green circular badge
  * Shows quantity ordered

---

## 6) Quantity Expansion Interaction

When clicking the green quantity circle:

It expands to the left.

Expanded layout:

Left → Right:

* Minus button
* Counter
* Plus button
* Trash (kuka) icon (rightmost)

Behavior:

* Plus:
  * Same animation logic as product card
* Minus:
  * Decreases quantity
* Trash:
  * Removes ALL quantity of that product immediately
* If quantity reaches 0:
  * Product disappears from list
* Multiple products stack vertically

All logic uses existing Pinia order store.

## 6.1 Empty Order State

If the last remaining product is removed (either via Trash icon or quantity decreased to 0):

The Rendelésed view must switch to an empty state.

### Layout

Top-right:
* X button (same behavior as before)

Center area:

* Large text:
  - **Nincsenek tételek a rendelésedben.**

* Smaller text below:
  - *azt hitted erre a hibaágra nem gondolok.*

Bottom:

* Green button (replaces Pénztárhoz button):
  - **Tételek hozzáadása**

### Behavior

* Clicking **Tételek hozzáadása**:
  - Navigates back to the Producer page
  - Order state remains empty
* Checkout button must NOT be visible in empty state
* Layout must remain consistent on both mobile and desktop

---

# PART C – Megjegyzés (Notes) System

## 7) Notes Entry Button

Below product list (not at absolute bottom):

Left-aligned:

* Label: **Megjegyzések**
* Right side: **+ icon**

Entire row acts as a button.

---

## 8) Notes Modal Behavior

Clicking Megjegyzések row:

### Mobile & Desktop:

* Full-screen modal
* Slides in from right

### Top Bar:

Left:
* Back arrow (←)
  * Returns to Rendelésed view
  * Saves typed text in Pinia

Right:
* X button
  * Closes entire Rendelésed view
  * Returns to Producer page

---

## 9) Notes Modal Layout

Under top buttons:

Title:
* **Megjegyzés írása**

Below (smaller font):
* "A megjegyzésedet megosztjuk a partnereinkkel, akik elkészítik és kiszállítják a rendelésed. :)"

Below:

* Textarea
* Placeholder:
  * "Üzenet az étteremnek..."
* Placeholder disappears on focus
* Textarea NOT focused by default
* This upper section occupies approx. 45% of screen height

Bottom:

* Green button:
  * **Kész**

Behavior:

* Clicking Kész:
  * Returns to Rendelésed view
  * Saves note in Pinia store

---

## 10) Notes Display After Saving

Back in Rendelésed:

* Previously "Megjegyzések +" row becomes:
  * Left: truncated note text
    * If too long → ellipsis (...)
  * Right: pencil (edit) icon

Clicking opens modal again.

---

# PART D – Checkout Section

## 11) Bottom Checkout Button

At very bottom of Rendelésed view:

Large green button:

Content:

Left:
* Total number of selected products (sum of quantities)

Right:
* Total price

Center text:
* **Pénztárhoz**

Style:
* Green background
* White text

Behavior:

* Navigates to `/penztar` (placeholder route)
* No payment logic yet

---

# PART E – State & Data Rules

* All order data lives in Pinia store
* No data loss when:
  * Closing desktop modal
  * Navigating back on mobile
* Quantity updates reflect immediately in:
  * Bottom bar
  * Checkout total
* Notes stored in Pinia (temporary)

---

# PART F – AI Recipes UI Refinement

## 12) AI Recipes Product Card Update

Current:
* Product card shows:
  * Large product name
  * Smaller secondary text

Change:

* Remove smaller secondary text
* Only keep main product name

No other layout changes.

---

# UX & Interaction Rules

* Animations consistent with previous iteration
* Expansion smooth
* No layout jump
* Mobile-first preserved
* Desktop modal behavior isolated via responsive classes
* Trash icon clearly visible but not visually dominant

---

# Acceptance Criteria

* Rendelés megtekintése navigates correctly
* Desktop shows right-side modal (~25% width)
* Mobile shows full screen page
* X closes correctly without losing state
* Quantity expansion works
* Trash removes item fully
* Multiple products stack correctly
* Notes modal opens and saves text
* Truncated note visible with pencil icon
* Checkout button displays correct totals
* Checkout navigates to placeholder route
* AI recipes smaller subtitle removed
* No mobile regressions

---

# Definition of Done

* Order drawer/modal fully functional
* Quantity logic consistent everywhere
* Notes persist within session (Pinia)
* Desktop modal responsive and clean
* Clean component separation
* No duplication of logic
* Code consistent with previous iterations
* No ambiguity left unresolved

---

# TASK

1. Read fully
2. Implement Rendelésed view (mobile + desktop behavior)
3. Connect bottom bar button to navigation
4. Implement expandable quantity controls
5. Implement notes modal and persistence
6. Add checkout button with totals
7. Refactor AI recipe card subtitle
8. Ensure no state loss
9. Maintain mobile-first integrity
10. If any ambiguity → STOP AND ASK BEFORE CODING