
# Building Solutions - Construction Supplier Platform

## Project Overview
**Building Solutions** is a modern, high-performance React web application designed for a leading construction materials supplier in Bangladesh. The platform streamlines sourcing, providing transparent pricing (10-15% markup model), project consultations, and a digital-first experience for contractors and developers.

**Key Features:**
- **Dynamic Hero Section:** Video background with progress controls, fallback states, and performance optimizations.
- **Interactive Projects Gallery:** Filterable portfolio with modal details, mixed media (video/image) carousels, and tabbed case studies.
- **Accessibility First:** Full keyboard navigation, ARIA attributes, focus management, and screen reader support.
- **Performance Optimized:** Lazy loading, `content-visibility` strategies, `fetchPriority` tuning, and CLS prevention.
- **Responsive Design:** Pixel-perfect rendering across Mobile (iOS safe areas), Tablet, and Desktop.

---

## Quick Start Guide

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/building-solution.git
    cd building-solution
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run locally:**
    ```bash
    npm start
    ```
    Access the app at `http://localhost:3000`.

### Environment
- **Framework:** React 18 (Functional Components + Hooks)
- **Styling:** Tailwind CSS (Utility-first)
- **Icons:** Custom SVG Components (Zero external icon font dependency)
- **Fonts:** Inter (Google Fonts) via CDN

---

## Directory & Component Structure

```
/src
  /components
    /Header.tsx          # Navigation, Mobile Menu, Scroll logic
    /Hero.tsx            # Video background, CTA, Intersection Observer controls
    /Projects.tsx        # Filtering logic, Data definition
    /ProjectCard.tsx     # Individual item display, Modal trigger
    /Modal.tsx           # React Portal, Focus Trap, Scroll Lock fix
    /Contact.tsx         # Form validation, Sanitization, Shake animation
    /Icons.tsx           # Centralized SVG icon library (Accessibility props)
    ...
  /hooks
    /useIntersectionObserver.ts  # Performance optimization hook
  App.tsx                # Main layout aggregator
  index.tsx              # Entry point, Type augmentations
```

---

## Development Workflow

### Code Changes
1.  **Branching:** Create feature branches from `main` (e.g., `feature/add-dark-mode`).
2.  **Linting:** Ensure no console warnings. TypeScript is set to `strict: true`.
3.  **Commit Messages:** Use imperative mood (e.g., "Add video progress bar", not "Added...").

### UI/UX Guidelines
- **Spacing:** Use Tailwind's grid system (`grid-cols-*`) and standardized padding (`py-20 md:py-28`).
- **Colors:**
    - Primary: `bg-gray-900` (Dark Theme)
    - Accent: `#f97316` (Construction Orange)
- **Typography:** `text-base` for inputs to prevent iOS zoom; `font-extrabold` for headings.

---

## Coding Standards & Best Practices

- **Type Safety:** No `any`. Define interfaces for all props (e.g., `interface Project { ... }`).
- **Performance:**
    - Use `loading="lazy"` and `decoding="async"` for images below the fold.
    - Use `fetchPriority="high"` for LCP images (Hero).
    - Pause background videos when out of viewport (`useIntersectionObserver`).
- **Accessibility:**
    - All interactive elements must have `aria-label` or visible text.
    - Modals must trap focus and restore it to the trigger on close.
    - Forms must have error association (`aria-describedby`).

---

## Logbook & Walkthrough Entries

**Recent Major Updates:**
- **Refactor:** Moved `Modal` to React Portal to fix CSS stacking context issues with transform animations.
- **Fix:** Added scrollbar width compensation in `Modal.tsx` to prevent layout shift on Windows.
- **Security:** Implemented strict input sanitization (trimming) in `Contact.tsx` and `RequestCallbackModal.tsx`.
- **Perf:** Added `fetchPriority` type augmentation in `index.tsx` to support React 19+ standards.

---

## Error Handling & Debugging

- **Video Failures:** `ImageCarousel` handles video load errors gracefully, showing a fallback UI.
- **Form Errors:** Forms use a "Shake" animation and auto-focus the first invalid field for immediate user feedback.
- **Console:** Check the console for `[Violation]` warnings regarding non-passive event listeners (we use `{ passive: true }` where possible).

---

## Future-Proofing & Scalability

- **SEO:** Structured Data (`LocalBusiness`) is injected in `index.html`. Keep this updated if address/hours change.
- **Scalability:** The `Projects` data array in `Projects.tsx` should eventually be moved to a headless CMS or API.
- **Maintenance:** When adding new icons, ensure they implement the `IconProps` interface for consistent accessibility handling.

---

## Contact & Support

For development support or to report bugs, please open an issue in the repository or contact the lead developer.

**Documentation Version:** 1.0.0
**Last Updated:** October 2023
