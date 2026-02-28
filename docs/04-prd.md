# Project Spec – Populate Database & Hamburger Menu (05-prd.md)

This file describes the next iteration for the **MEKKK webapp**, focusing on populating the Supabase database with products and producers, and implementing a hamburger menu UI.

---

## 0) General Guidelines (MANDATORY)

* TypeScript throughout
* Tailwind CSS as primary styling
* Minimal, well-separated components
* No test files to be generated
* Update `.env.example` and `README.md` if any configuration changes
* Ask before coding if any requirement is unclear
* Supabase remains the backend; localStorage no longer used

---

## 1) Goal (User Perspective)

* Populate the database with a broader set of products and producers
* Ensure images in `public/pictures` are linked to database records
* Improve mobile UX with a hamburger menu
* Provide clear navigation to About, Regulations, Producers, and Cheese info sections
* Maintain visual consistency and green branding

---

## 2) Feature Description

### 2.1 Database Population

**Products** (10 types):

| Name      | Image file (public/pictures) |
|-----------|------------------------------|
| borsos    | borsos.jpg                   |
| csipos    | csipos.jpg                   |
| edes      | edes.jpg                     |
| fustolt   | fustolt.jpg                  |
| garnela   | garnela.jpg                  |
| hazi      | hazi.jpg                     |
| paradicsom| paradicsom.jpg               |
| sos       | sos.jpg                      |
| spenot    | spenot.jpg                   |
| ...       | ...                          |

**Producers** (initial 5 + 20 random):

| Name      | Rating |
|-----------|--------|
| maria     | 5.0    |
| hegedus   | 4.9    |
| zsolt     | 4.9    |
| dominik   | 4.9    |
| dzsoki    | 4.7    |
| producer6–25 | random 1.5–3.9 |

- Maria has 9 products associated, the others 7 each
- Random producers also have 7–9 products each
- Producer images in `public/pictures` (farm, harvest, workers, village)

**Note:** Products table cleared before inserting new 10 products; producers table retains the original 5, then random 20 added.

---

### 2.2 Hamburger Menu UI

* Mobile-first, responsive
* Hamburger icon: **three thick horizontal green lines** in top-left corner
* Clicking the icon opens a left-side modal:
  - Covers **80% of the screen width**
  - Right-side area slightly darker, clicking here closes modal
* Modal content:
  - Navigation links:
    - Rólunk
    - Szabályzat
    - Termelőink
    - **Separated section:** Kecskesajt
      - Típusok
      - Készítés
      - Története
  - All text content can be short placeholder descriptions for now
* Layout:
  - Hamburger menu left, logo center-right, always clickable to navigate home
  - Profile icon on right: small grey circle with simple green figure (functionless for now)

---

## 3) Scope

### In Scope

* Populate products & producers in Supabase database
* Link product and producer images from `public/pictures`
* Implement hamburger menu as described
* Ensure mobile-first UX
* Provide initial placeholder descriptions for modal sections

### Out of Scope

* Detailed text/content refinement
* Producer/product relations beyond initial mock
* Functional profile icon

---

## 4) Technical Requirements

### 4.1 Database

* Products table:
  - name, image_path, other relevant fields
* Producers table:
  - name, rating, associated product IDs, image_path
* Random 20 producers generated with images
* Ensure proper foreign key associations between producers and products

### 4.2 Frontend

* Hamburger menu modal using Tailwind & Nuxt 3 components
* Left-side panel opens over 80% width, right side dark overlay closes modal
* Green branding, rounded buttons, consistent sizing
* Logo clickable and navigates to `/`
* Profile icon placeholder on top-right

---

## 5) Acceptance Criteria

* Database contains 10 products, 25 producers (5 fixed + 20 random)
* All images linked properly from `public/pictures` to Supabase
* Hamburger menu works on mobile and desktop
* Modal closes on dark overlay click
* Navigation links visible and correctly separated (cheese section below other links)
* Logo clickable to home
* Profile icon visible top-right
* Placeholder descriptions for modal sections present
* No localStorage used

---

## 6) Definition of Done

* Supabase database populated with products & producers
* Images uploaded and correctly linked
* Hamburger menu implemented and fully functional
* Mobile-first interactions tested
* Tailwind styling and green branding consistent
* `.env.example` and `README.md` updated if needed
* All previous functionality remains intact
* No localStorage dependency

---

# TASKS

1. Prepare Supabase tables as specified (products, producers)
2. Populate `products` table with 10 new entries
3. Populate `producers` table with 5 original + 20 random entries
4. Upload all corresponding images to Supabase Storage
5. Implement hamburger menu modal with links and placeholder content
6. Test mobile and desktop layouts
7. Verify all links and modal interactions