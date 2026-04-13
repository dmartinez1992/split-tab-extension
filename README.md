# Tab Split View — Firefox Extension

A Firefox extension that splits your tabs into a side-by-side layout with one click (or a keyboard shortcut).

---

## What It Does

When you have multiple tabs open and trigger the extension:

- 🖥️ **Right window** — your currently active tab
- 🖥️ **Left window** — all your other tabs, grouped together

Each window takes up exactly half your screen, giving you a clean split-screen workspace without needing any third-party software.

---

## How to Use

**Option 1 — Toolbar button**
Click the Tab Split View icon in your Firefox toolbar.

**Option 2 — Keyboard shortcut**
Press **Option + X** (Mac) / **Alt + X** (Windows/Linux)

> You need at least 2 tabs open for the split to work.

---

## Installation

### From Firefox Add-ons (easiest)
Coming soon on [addons.mozilla.org](https://addons.mozilla.org)

### Manual Install (Developer Mode)
1. Download or clone this repo
2. Open Firefox and go to `about:debugging`
3. Click **This Firefox**
4. Click **Load Temporary Add-on…**
5. Select the `manifest.json` file from the extension folder

---

## Files

| File | Purpose |
|---|---|
| `manifest.json` | Extension configuration, permissions, and shortcut definition |
| `background.js` | Core logic — splits tabs into two positioned windows |
| `icons/icon48.png` | Toolbar icon |

---

## Permissions Used

| Permission | Reason |
|---|---|
| `tabs` | Read and move tabs between windows |
| `windows` | Create and position browser windows |

---

## Contributing

Have an idea for an improvement? Open an issue or submit a pull request on [GitHub](https://github.com/dmartinez1992/split-tab-extension).

---

## License

MIT — free to use and modify.
