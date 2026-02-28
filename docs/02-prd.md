# 02 – PRD.md  
## Iteration 1 – Homepage Filtering & Producer Flow

This document defines the first functional homepage iteration for MEKKK.

All implementation must follow rules defined in `CLAUDE.md`.

After completing this iteration, update:  
`docs/backlog.homepage.md`

---

# 1. Homepage – Goat Cheese Selection

## 1.1 Goat Cheese Row (Top Section)

- Horizontally scrollable on mobile
- Each cheese:
  - Circular image
  - Short label below (e.g., sós, édes, kapros, házi)
- No green background when not selected
- When selected:
  - Darker green rounded square background appears behind image
  - Subtle animation on highlight in/out
- Only one cheese can be selected at a time
- Selecting a different cheese:
  - Previous highlight animates out
  - New highlight animates in

---

# 2. Producers Section

Appears only when a cheese is selected.

## 2.1 Results Header

Above producer cards:

Left aligned:
- “X találat”

Right aligned (same row):
- “Visszaállítás” button

Button style (inactive style):
- White background
- Green border
- Green text
- Rounded edges

Pressing “Visszaállítás”:
- Clears cheese selection
- Hides producers
- Removes green highlight

---

## 2.2 Filter Row (Below Cheese Row)

Directly under cheese row:

Horizontally scrollable if needed.

Filters:

1. **30 perc alatt**
2. **Legmagasabb értékelés**
3. **Rendezés ▾**

### Filter Active State

If active:
- Green background
- White text

If inactive:
- Same style as “Visszaállítás” button

---

# 3. 30 Perc Alatt Filter Logic

Mock delivery times:

- All producers: under 30 minutes
- Except: **Hegyi majorság**

When “30 perc alatt” is active:
- Hegyi majorság disappears
- If it was visible previously, it animates out

Delivery data:
- Use minutes (not days)
- Example: 18 perc, 24 perc, 42 perc

---

# 4. Producer Cards (Mobile Layout)

When producers appear:

Each producer is displayed as:

- Large rounded rectangle
- Occupies ~90% width of mobile screen
- ~5% margin left and right

Inside card:

- Producer image
- Producer name
- Rating (green star + count in parentheses)
- Delivery time (e.g., 18 perc)

Cards stacked vertically.

---

# 5. Rendezés (Sorting)

## 5.1 Trigger

“Rendezés ▾” filter button

When active:
- Show label:
  - “Rendezve értékelés alapján”
  - Keep green arrow icon

---

## 5.2 Bottom Sheet (Modal)

This is a **bottom sheet modal**.

Behavior:
- Slides up from bottom
- Covers ~50% of screen height
- Upper half of page visible but dimmed slightly

Dismiss if:
- User taps dimmed area
- User presses Reset
- User presses Apply

---

## 5.3 Bottom Sheet Content

Top centered:
- “Rendezés”

Below:
Radio group:

- “Értékelés alapján”
- “Legkorábbi érkezés”

Radio style:
- Green circles
- Selected radio: thicker green outer ring

---

## 5.4 Bottom Sheet Buttons

### Apply (Alkalmaz)

- Wide button
- ~90% screen width
- Green background
- White text
- Rounded edges

### Reset

- White background
- Green border
- Green text

Pressing Reset:
- Close modal
- Remove sorting
- Remove dim overlay

---

# 6. Sorting Logic

If sorted by rating:
- Highest rating first

If sorted by earliest arrival:
- Lowest delivery minutes first

If no sorting selected:
- Default order (mock order)

---

# 7. Filter Interaction Rules

- Multiple filters can be active simultaneously
- “30 perc alatt” and sorting can work together
- “Legmagasabb értékelés” acts as quick sort (rating desc)
- If both “Legmagasabb értékelés” and custom sorting active:
  - Custom sorting overrides quick filter

---

# 8. Animations

- Cheese highlight: subtle fade + scale
- Producer cards: slight fade-in
- Removing producer: fade-out
- Bottom sheet: slide up/down
- Dim overlay: fade in/out

Keep animations minimal and fast.

---

# 9. Mock Data Requirements

Each producer must include:

- id
- name
- image
- rating (number)
- reviewCount (number)
- deliveryMinutes (number)
- address (for later use)

Include:
- One producer named “Hegyi majorság”
  - deliveryMinutes > 30

All others:
- deliveryMinutes < 30

---

# 10. UX Constraints

- Mobile-first only
- No horizontal overflow except intentional scroll areas
- Filters scroll horizontally if needed
- No layout shift when filters activate
- All styles Tailwind-first

---

# Mandatory Implementation Rule

Before coding:
Claude must list 3–7 bullet points describing:
- Files to create
- Components to update
- Stores to modify
- Composables needed

After completion:
- Update `docs/backlog.homepage.md`