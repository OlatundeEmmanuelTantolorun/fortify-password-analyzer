# Fortify

**Know if your password can survive modern attacks before hackers do.**

Fortify is a client-side password strength analyzer and generator. Every check runs entirely in your browser — nothing you type is ever sent, logged, or stored anywhere.

<p align="center">
  <img
    src="./"
    alt="Fortify Password Analyzer Preview"
    width="100%"
  />
</p>

![License: MIT](https://img.shields.io/badge/License-MIT-00E5FF.svg)
![React 19](https://img.shields.io/badge/React-19-111827.svg)
![Vite](https://img.shields.io/badge/Vite-8-111827.svg)

---

## Features

- **Live analysis** — no "analyze" button. Strength, score, entropy, and crack-time estimates update as you type.
- **Instant verdict** — a single 0–100 score with a clear rating, backed by three secondary stats: entropy, estimated crack time, and a letter grade.
- **Why it scored that way** — an 8-point checklist grouped into character variety, patterns, and length, so the reasoning is visible, not a black box.
- **How to improve** — ranked, point-weighted suggestions (e.g. _"Add a symbol — +15"_) so the highest-impact fix is obvious.
- **Password generator** — a length slider (8–32) and character-type toggles, generated with `crypto.getRandomValues` for cryptographically secure randomness.
- **Privacy by design** — fully client-side. No network requests, no analytics, no storage.

## Tech stack

|                       |                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| Framework             | React 19 + Vite                                                                                       |
| Styling               | Tailwind CSS v4                                                                                       |
| Animation             | Framer Motion                                                                                         |
| Password intelligence | [zxcvbn](https://github.com/dropbox/zxcvbn) (dictionary, keyboard-walk, and repeat-pattern detection) |
| Icons / toasts        | react-icons, react-hot-toast                                                                          |

## Getting started

```bash
git clone https://github.com/OlatundeEmmanuelTantolorun/fortify-password-analyzer.git
cd fortify-password-analyzer
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

```bash
npm run build     # production build
npm run preview   # preview the production build locally
```

## How scoring works

Fortify combines two independent signals:

1. **Pool-based entropy** — `entropy = length × log2(characterPoolSize)`, the classic information-theoretic estimate of how many bits of randomness a password contains.
2. **Pattern detection via zxcvbn** — dictionary words, keyboard walks (`qwerty`, `asdfgh`), sequential runs (`1234`, `abcdef`), and repeated characters, cross-referenced against a common-password list.

These feed a weighted 0–100 score (length, character variety, and entropy contribute; common passwords, repeats, sequences, and dictionary hits penalize), which then maps to a rating (Very Weak → Excellent) and a letter grade (F → A+). Suggested fixes are ranked by their estimated point value using the same weights, so the highest-leverage fix always surfaces first.

Estimated crack times are computed for two attacker profiles:

- **Online (throttled)** — 100 guesses/second, representative of a rate-limited login form.
- **Offline (GPU cluster)** — 10 billion guesses/second, representative of an attacker with a stolen password hash.

## Project structure

```
src/
├── components/     Header, Workspace, Tabs, PasswordField, StrengthBar,
│                   Metrics, Checklist, Suggestions, Generator, Footer
├── hooks/          useAnalyzer, useGenerator
├── utils/          entropy, crackTime, securityRating,
│                   passwordGenerator, commonPasswords, helpers
├── App.jsx
├── main.jsx
└── index.css
```

## License

MIT © [Emmanuel Olatunde (Elitz)](https://github.com/OlatundeEmmanuelTantolorun)
