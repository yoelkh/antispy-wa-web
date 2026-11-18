<p align="center">
  <img src="icons/icon128.png" alt="AntiSpy Blur" width="96">
</p>

<h1 align="center">AntiSpy Blur for WA Web</h1>

<p align="center">
  <img alt="Browser" src="https://img.shields.io/badge/browser-Edge%20%C2%B7%20Chrome-0078d4?logo=microsoftedge&logoColor=white">
  <img alt="Manifest" src="https://img.shields.io/badge/manifest-V3-34a853">
  <img alt="Dependencies" src="https://img.shields.io/badge/dependencies-none-lightgrey">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
</p>

<p align="center">
  <b>English</b> · <a href="README.id.md">Bahasa Indonesia</a>
</p>

---

AntiSpy Blur hides names and messages on WhatsApp Web from anyone looking over your shoulder, and shows them again when you hover. It was built around two goals: a blur that feels smooth, and a cost close to zero in CPU and RAM.

The blur is done entirely by one static stylesheet. JavaScript only flips a few attributes on `<html>` when a setting changes; nothing runs per message, per chat or while you scroll.

## Highlights

- **Private by default.** The stylesheet loads before the page renders and blurs everything, so nothing flashes in clear text at startup.
- **Hover to reveal.** By default, hovering the conversation reveals the whole conversation, and hovering the chat list reveals only the row under the cursor. The reply box is never blurred.
- **Four scopes.** Both panels, chat list only, messages only, or names only.
- **Re-blurs by itself.** After the mouse sits still for a few seconds, and whenever you switch to another window.
- **Panic lock.** One shortcut blurs everything and ignores hover until you press it again.
- **Fits any window size.** Rules follow WhatsApp's structure (panels, rows), not pixel positions.
- **Fails safe.** If WhatsApp changes its markup, the extension blurs whole panels instead of showing everything.
- **No network, no tracking, no libraries.** The only permission is `storage`.

## Install

1. Download or clone this repository.
2. Open `edge://extensions` (or `chrome://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the repository folder.
5. Open or reload `web.whatsapp.com`.

## Settings

| Setting | Options | Default |
|---|---|---|
| What to blur | Both · Chat list · Messages · Names only | Both |
| Reveal chat list | Hover row · Hover panel · Hold Ctrl | Hover row |
| Reveal messages | Hover panel · Hover each · Hold Ctrl | Hover panel |
| Reveal delay | 0–500 ms | 120 ms |
| Blur strength | 3–20 px | 8 px |
| Re-blur when mouse is idle | Off · 5s · 10s · 30s | 10s |
| Re-blur when switching windows | On · Off | On |
| Keep photos and videos blurred until hovered | On · Off | Off |

Typing does not count as activity for the idle timer, so messages re-blur while you write a long reply. Move the mouse to see them again.

## Shortcuts

| Shortcut | Action |
|---|---|
| `Alt+X` | Turn blur on or off |
| `Alt+Shift+X` | Panic lock |

Change them at `edge://extensions/shortcuts`.

## How it works

| File | Role |
|---|---|
| `blur.css` | Every blur and reveal rule |
| `content.js` | Maps settings to attributes on `<html>`; idle timer and focus handling |
| `background.js` | Service worker that only wakes for the two shortcuts |
| `popup/` | Settings panel, plain HTML/CSS/JS |
| `defaults.js` | Default settings shared by the page script and the popup |

If WhatsApp updates and something stops blurring, the selectors to adjust are all in `blur.css`. The "Names only" scope depends on a few of WhatsApp's generated class names and is the most likely part to need an update.

## Credits

Some WhatsApp class names were cross-checked against [Privacy Extension for WhatsApp Web](https://github.com/LukasLen/Privacy-Extension-For-WhatsApp-Web) by Lukas Lenhardt (MIT).

This project is not affiliated with WhatsApp or Meta.

## License

[MIT](LICENSE) © 2026 yoelkh
