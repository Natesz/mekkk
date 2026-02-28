# Project Specification – Supabase Integration (04-prd.md)

This iteration replaces all browser-based persistence with Supabase cloud backend.

Goal:
The application must rely exclusively on Supabase for all persistent data and file storage.

---

## 0) General Guidelines (MANDATORY)

- TypeScript everywhere
- Tailwind CSS remains primary styling solution
- Minimalist, small, well-separated components
- Do NOT generate test files
- `.env.example` and `README.md` must be updated if configuration changes
- If any requirement is unclear, ASK before implementation
- No fallback or temporary storage mechanisms allowed

---

## 1) User Perspective Goal

From the user's perspective:

- Data must persist after refresh
- Data must be available across devices
- Uploaded images must load reliably
- No visible UI/UX change
- Authentication is NOT part of this iteration

This is a backend-only architectural change.

Browser storage → Supabase cloud persistence

---

## 2) Feature Description

The application must completely eliminate:

- localStorage
- sessionStorage
- any persistent browser storage

Supabase becomes the single source of truth:

- Structured data → Supabase Database
- Images/files → Supabase Storage
- Frontend may only store IDs or URLs temporarily in memory

---

## 3) Scope

### In Scope

- Remove all localStorage usage
- Integrate Supabase SDK
- Persist all entities in Supabase Database
- Upload and load images from Supabase Storage
- Create reproducible migration script
- Create documentation file: `docs/supabase_use.md`

### Out of Scope

- Migrating legacy browser data
- Offline mode
- Backup system
- Versioning
- Authentication

---

## 4) Technical Requirements

### 4.1 Data Persistence

All persistent entities must:

- Be stored in Supabase tables
- Have:
  - id (UUID or Supabase default)
  - created_at timestamp
  - updated_at timestamp

CRUD operations must use Supabase SDK.

Frontend constraints:

- No persistent full data caching
- Only temporary in-memory state allowed
- No browser-based persistence

---

### 4.2 Image Storage

- Images must be uploaded to Supabase Storage bucket
- Database must store only:
  - storage path OR
  - public URL
- Binary image data must NOT be stored in database columns

---

### 4.3 Migration Script

Kötelező egy önállóan futtatható JavaScript migrációs script. Elhelyezés:
db/migrations/


Script must:

- Create required tables
- Define timestamp fields
- Define image reference fields
- Be runnable independently
- Provide reproducible database setup

No manual DB setup should be required.

---

## 5) Documentation Requirement

After implementation, create:

docs/supabase_use.md


This file must document:

- How to connect Supabase in the project
- Environment variable setup
- How to create tables
- How to run migration script
- How to upload an image to Supabase Storage
- How to retrieve image URL
- How to create, update, delete records
- How to query sorted data
- Example code snippets for common use cases

The documentation must be clear enough for a developer to onboard without additional explanation.

---

## 6) Acceptance Criteria

- No localStorage.setItem
- No localStorage.getItem
- No localStorage.removeItem
- No sessionStorage usage
- All persistent data stored in Supabase
- All images loaded from Supabase Storage
- Database contains only image references
- App works after refresh
- App works across devices
- Migration script exists and works
- supabase_use.md exists and is complete

---

## 7) Definition of Done

Feature is complete when:

- Application fully uses Supabase backend
- No browser persistence dependency remains
- Database setup is reproducible via migration script
- UI/UX remains unchanged
- supabase_use.md provides full operational documentation
