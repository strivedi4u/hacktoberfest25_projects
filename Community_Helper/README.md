# Community Helper

Find local help and resources faster: food banks, shelters, healthcare, education, legal aid, employment support, and more. This is a lightweight, accessible, mobile‑first web app with modern UI and zero build tooling.

## Features
- Modern, responsive UI with dark theme and smooth micro‑interactions
- Search by name, description, or tag with debounced input
- Filters: Location and Category; Sorting: Name, Location, Category
- Clickable tag chips to refine searches instantly
- Accessible custom selects (combobox + listbox) with full keyboard support
- Results count with aria‑live updates; skip‑link, focus styles, reduced‑motion support
- Rich dataset including category, tags, contact (phone/email/website), address, and hours

## Quick start
1) Clone or download this repository
2) Open `index.html` in your browser
   - Optional: serve locally for best experience (cache, CORS-safe)
     - VS Code Live Server, or any static server (e.g., `npx serve`)

## Project structure
- `index.html` – Layout, hero, search form, resources grid, footer
- `styles.css` – Theme tokens (CSS variables), responsive layout, cards, custom select styles
- `script.js` – Search/filter/sort logic, tag chips, accessible custom select component
- `data.js` – Resource data (name, description, location, category, tags, contact, hours, address)

## Usage
- Search: type keywords (e.g., “legal”, “groceries”, “youth”) – results update live
- Filters: choose Location and Category; combine with search
- Sorting: sort by Name, Location, or Category
- Tags: click a chip on a resource card to filter by that tag
- Contact: use Call/Website/Email actions on cards

## Keyboard support (custom select)
- Open list: Enter, Space, or ArrowDown on the closed button
- Navigate: ArrowUp/ArrowDown; Home/End jump to ends
- Select: Enter or Space; Close: Esc or click outside
- Focus styles are visible; screen readers announce options via ARIA roles

## Theming
- Colors defined in `:root` as CSS variables (e.g., `--primary`, `--bg`, `--text`)
- Search input uses themed background; becomes white on focus for contrast
- Dropdown popovers and custom selects follow the dark theme

## Data model
Each resource entry in `data.js` follows:
```
{
  id: Number,
  name: String,
  description: String,
  location: String,
  category: String,
  tags: String[],
  contact: { phone?: String, email?: String, website?: String },
  address?: String,
  hours?: String
}
```
Edit or add resources directly in `data.js`. New locations/categories auto‑populate filters.

## Accessibility
- Skip link to main content; semantic headings and roles
- `aria-live` for results count
- Custom select uses `role=combobox`/`listbox`/`option` and keyboard patterns
- `prefers-reduced-motion` honored; focus-visible outlines for keyboard users

## Browser support
- Modern evergreen browsers. Native selects remain if JS doesn’t run.

## Contributing
- Fork the repo and create a feature branch
- Make changes, test across mobile/desktop widths
- Open a PR with screenshots and a short description of changes

## Roadmap ideas
- Pagination / infinite scroll
- “Open now” filter based on hours
- Map view and distance-based sorting
- Offline caching and PWA support

## License
MIT
