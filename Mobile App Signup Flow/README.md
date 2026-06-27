# Nimbus — Mobile Auth Flow

A modern, mobile-first authentication flow (Welcome → Sign Up → Login → Forgot Password) built with **React, TypeScript, Tailwind CSS, and Framer Motion**.

![Tech](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000) ![Tech](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff) ![Tech](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=fff) ![Tech](https://img.shields.io/badge/Framer%20Motion-11-EF008F?logo=framer&logoColor=fff)

## ✨ Features

- **3 core screens** — Welcome, Sign Up, Login — plus a Forgot Password screen and a 404 fallback
- **Soft modern SaaS UI** — light blue surface, white rounded-30px cards, purple (`#6366F1`) primary accent
- **Full form validation** — required fields, email format, 8-character minimum password, confirm-password match, real-time error clearing
- **Password strength meter** — live 5-bar indicator (weak → strong)
- **Show/hide password** toggles on every password field
- **Remember Me** — persists email to `localStorage` and pre-fills it on return
- **Toast notifications** — success/error/info, auto-dismiss, accessible (`aria-live`)
- **Dark mode** — toggle in the corner, respects system preference, persisted to `localStorage`
- **Animated transitions** — page fade/slide on route change, staggered field entrances, button micro-interactions, all routed through Framer Motion and respecting `prefers-reduced-motion`
- **Accessible** — labelled fields, `aria-invalid`/`aria-describedby` on errors, visible focus rings, keyboard-operable controls
- **Responsive** — single column on mobile, comfortably centered card on tablet/desktop

## 🗂 Project Structure

```
auth-flow/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/           # Logo, SocialButtons, WelcomeIllustration
│   │   ├── layout/         # AuthShell/AuthCard wrapper, ThemeToggle
│   │   └── ui/             # Button, TextField, Checkbox, Divider, ToastStack, StrengthMeter
│   ├── context/            # ThemeContext, ToastContext
│   ├── pages/              # WelcomePage, SignUpPage, LoginPage, ForgotPasswordPage, NotFoundPage
│   ├── types/              # Shared TypeScript interfaces
│   ├── utils/              # validation.ts, storage.ts
│   ├── App.tsx             # Routes + animated transitions
│   ├── main.tsx            # Entry point, providers
│   └── index.css           # Tailwind directives + base styles
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:5173
```

### Other scripts

```bash
npm run build      # Type-check + production build to /dist
npm run preview     # Preview the production build locally
npm run lint        # Run ESLint
```

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Surface background | `#EEF4FF` (light) / `#0F1226` (dark) |
| Card background | `#FFFFFF` (light) / `#171B34` (dark) |
| Primary | `#6366F1` |
| Card radius | `30px` |
| Field radius | `16px` |
| Display font | Plus Jakarta Sans |
| Body font | Inter |

These live in `tailwind.config.js` under `theme.extend` — change them in one place to re-theme the whole app.

## 🧭 Routes

| Path | Screen |
|---|---|
| `/welcome` | Welcome / landing screen |
| `/signup` | Create account |
| `/login` | Login |
| `/forgot-password` | Password reset request |
| `*` | 404 |

## 🔐 Notes on the "backend"

This is a **frontend-only** flow: form submissions are simulated with a short artificial delay (`setTimeout`) and a success toast, so you can see loading/disabled states and transitions end-to-end. Wire `handleSubmit` in `SignUpPage.tsx` / `LoginPage.tsx` to your real API (e.g. `fetch('/api/auth/login', …)`) when ready — the validation, error states, and UI are already in place.

## 📄 License

MIT — see [LICENSE](./LICENSE).
