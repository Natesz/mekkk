# MEKKK Iteration 03 – Producer Product Details & Interactive Ordering (03-prd.md)

This file describes the next iteration for the MEKKK Nuxt 3 mobile-first webapp.

---

## 0) Mandatory Guidelines

* TypeScript everywhere
* Tailwind CSS primary styling, minimal custom CSS
* No tests
* Follow existing component structure
* All front-end interactions must remain mobile-first
* Use Supabase backend for all persistent data

---

## 1) Goal

Enhance producer product detail pages to:

* Show “Most Ordered” products first
* Display remaining products for the producer under a **További termékek (Other Products)** section
* Support interactive product ordering with animated plus/minus counters
* Allow viewing product details in a modal
* Keep mobile UX clean and responsive

---

## 2) Feature Description

### 2.1 Products Display

* When a producer is opened:
  * The **Most Ordered** products are shown first
  * Below that, **További termékek** displays the rest of the producer’s products
  * **No duplicates**: products already in Most Ordered do not appear here
* Product card layout:
  * **Image**: ~50% width on mobile, the other half displays name, price, description
  * **Plus overlay**:
    * Green square in the top-right corner of the image (~1/3 width/height of image)
    * Rounded corners
    * Plus sign centered
  * Clicking **Plus**:
    * Green square expands left
    * Left side: **Minus** button
    * Middle: counter
    * Right remains the **Plus** button
    * Counter animation: number rises vertically from plus/minus buttons with a green circle behind
  * Clicking **Minus**:
    * Counter decreases with same animation
    * At zero, layout collapses back to initial state (only Plus visible)
* First addition of any product:
  * Bottom fixed bar appears:
    * Green rectangle
    * Shows **Rendelés megtekintése** + total price
  * Dynamically updates as counters change
  * Disappears if all counters = 0

### 2.2 Product Modal

* Clicking anywhere on product card opens modal (~75% of screen height)
* Modal layout:
  * Top: product image full width, corners slightly rounded
  * Below: product name
  * Price in green
  * Description
  * Bottom-left: same plus/minus counter as on card
  * Bottom-right: **Hozzáadás** button with product total (not overall total)
* Interactions:
  * Plus/minus updates counter with animation
  * Clicking **Hozzáadás** adds product total to overall order
  * Close modal:
    * X button top-right on image (slightly inset, circular background)
    * Clicking outside modal closes it as well

### 2.3 Hamburger Menu Update

* Top-left hamburger menu (three thick green horizontal lines)
* Opens side modal (~80% width)
  * Right side slightly darker: clicking here closes modal
  * Menu items:
    * Rólunk
    * Szabályzat
    * Termelőink
    * **Kecskesajt**:
      * Típusok
      * Készítés
      * Történet
  * New section at the bottom: **AI receptek**
    * Green, slightly larger font than other menu items
    * Small AI-style icon
    * Click shows placeholder (later: AI-generated recipes for selected product)

---

## 3) UX Guidelines

* Animations:
  * Plus/minus counter: number rises vertically with green circle behind
  * Green overlay expands/collapses smoothly
* Responsiveness:
  * Mobile-first layout
  * Images and modals adapt to screen width
* No duplicates in product lists
* Counters dynamically update totals
* Modal closes via X or background tap
* Fixed bottom bar for order only visible when at least one product > 0

---

## 4) Data Handling

* Products, Most Ordered, and other producer products stored in Supabase
* Counters managed in Pinia store
* Totals calculated dynamically based on Pinia state
* All product images stored in Supabase Storage
* No localStorage persistence

---

## 5) Acceptance Criteria

* Most Ordered products appear at top
* További termékek shows remaining products without duplication
* Plus/minus counters work with animation
* Bottom order bar appears/disappears dynamically
* Product modal displays full product info and interactive counter
* Hamburger menu updated with **AI receptek** section
* Responsive and mobile-first UX
* Supabase backend is the single source of truth

---

## 6) Definition of Done

* All above features implemented and visually consistent
* Counters animate correctly
* Modals and menus function as described
* All product data served from Supabase
* No localStorage usage
* Pinia state updates totals correctly
* File structure and naming follow previous MEKKK iterations

---

# TASK

1. Read fully
2. Create components and update pages as described
3. Use Supabase for all data
4. Ensure animations and counters work
5. Verify mobile-first UX
6. Maintain code consistency and file structure
7. If any ambiguity, **stop and ask before coding**