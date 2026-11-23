# Interactive Birthday Surprise Template

A mobile-friendly, interactive birthday website featuring multiple surprises like: a runaway "NO" button, a retro terminal password screen, flipping Polaroids, mini-games, a typewriter birthday letter and more that remain a surprize for now.

**Demo Password:** `01/01/2000`

## 1. Add Your Photos
Place your images in the same folder as `index.html` using your own names: change these exact filenames:

- `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg` — Polaroid gallery photos
- `memory1.jpg`, `memory2.jpg` — Main photos for the two memory pages
- `background_memory1.jpg`, `background_memory2.jpg` — Background photos for the two memory pages

## 2. Customize the Text & Password

### In `index.html`
- Replace all `[Name]`, `[Your Name]`, and `[Age]` placeholders.
- Update the password hint and remove the demo `placeholder="01/01/2000"` inside `#page-2` before sharing.
- Edit the Polaroid captions and flip messages (`#page-3`).
- Write your two memories in `#page-memory-1` and `#page-memory-2`.
- Remove the red `<p class="template-note">` reminder lines in `#page-memory-1`, `#page-memory-2`, and `#page-7` before sharing.
- Add your gift or surprise plan inside `#page-8` (`.prize-text`).

### In `script.js`
- **Password:** Change `'01012000'` inside `checkPassword()` to the target date (`DDMMYYYY`).
- **Background code text:** Edit the age and wishes inside `codeSnippet`.
- **Emoji matching game:** Personalize the emojis in `EMOJIS` (keep 4 matching pairs + 1 bonus emoji).
- **Catching game:** Customize the falling items in `spawnItem()` (`🎁`, `🎂`, and `💣` to avoid).
- **Birthday letter:** Write your letter inside `letterChunks` (add more strings to split it into multiple `[Read more...]` sections).

## 3. Run or Host It
- **Locally:** Open `index.html` in any browser.
- **Online (Free):** Upload the files to a GitHub repository and enable **GitHub Pages** under `Settings > Pages`.
