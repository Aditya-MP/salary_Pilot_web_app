# 💰 SalaryPilot — Your Financial Autopilot

**SalaryPilot** is a modern, AI-powered personal finance web application that helps salaried professionals take control of their income through intelligent salary splitting, behavioral guardrails, and data-driven financial insights.

> Built with React 19, TypeScript, Tailwind CSS, and powered by custom financial engines.

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

---

## 🚀 Features

### 🎯 Core Features (Free)

| Feature | Description |
|---------|-------------|
| **Salary Splitting** | Automatically divide your salary into Needs, Wants, and Investments using a customizable split ratio (default: 50/30/20) |
| **Triple Guard System** | A 3-layer behavioral guardrail (Emotion Guard, Discipline Guard, Risk Guard) that evaluates your financial decisions before execution |
| **Risk Profiling** | Choose your risk appetite — Conservative, Balanced, or Aggressive — to customize your investment strategy |
| **Portfolio Tracker** | Track your holdings across Equity, Crypto, and ESG assets with real-time allocation visibility |
| **News Feed** | Stay updated with curated financial news relevant to your portfolio |
| **User Profile** | Manage personal details, linked bank accounts, and UPI IDs |

### 👑 Premium Features (PRO)

| Feature | Description |
|---------|-------------|
| **Quarterly Pulse** | Track your financial health over a 3-month cycle (Ball → Strike → Out) with month-over-month performance analytics |
| **Learning Hub** | Access educational content on personal finance, tax planning, and investment strategies |
| **AI Wealth Coach** | Get personalized AI-driven financial advice including Tax Expert insights, Risk Alerts, and SEBI compliance guidance |

---

## 🧠 Financial Engines

SalaryPilot is powered by a suite of custom-built financial calculation engines:

```
src/engine/
├── guardEngine.ts          # Triple Guard behavioral evaluation system
├── pulseEngine.ts          # Quarterly Pulse financial health tracker
├── taxEngine.ts            # Tax computation engine (equity, crypto, ESG)
├── sustainabilityEngine.ts # ESG sustainability impact calculator
├── trendEngine.ts          # Market trend analysis engine
└── decisionEngine.ts       # Core decision aggregation engine
```

### Triple Guard Engine

The Guard Engine evaluates every financial decision through three weighted layers:

- **Emotion Guard (40%)** — Detects emotional state (`calm`, `stressed`, `fomo`) and gates impulsive decisions
- **Discipline Guard (30%)** — Rewards consistency through a streak-based discipline score
- **Risk Guard (30%)** — Aligns decisions with your chosen risk profile

> ⚡ A composite score ≥ 0.75 is required for a decision to be approved.

### Sustainability Engine

Calculates ESG (Environmental, Social, Governance) impact of your investments across asset classes, with a 10% bonus multiplier for disciplined investors maintaining an active streak.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [React 19](https://react.dev/) with TypeScript |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **State Management** | [Zustand 5](https://zustand-demo.pmnd.rs/) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Charts** | [Recharts 3](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Routing** | [React Router DOM 7](https://reactrouter.com/) |
| **Utilities** | [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge) |

---

## 📁 Project Structure

```
salary_Pilot_web_app/
├── public/                    # Static assets
├── src/
│   ├── assets/                # Images and media
│   ├── components/
│   │   ├── landing/           # Landing page components (Hero, UltraBackground)
│   │   ├── layout/            # Layout components (Navbar)
│   │   └── ui/                # Reusable UI primitives (GlassCard, Button)
│   ├── data/                  # Mock data for portfolio and decision logs
│   ├── engine/                # Financial calculation engines
│   ├── hooks/                 # Custom React hooks
│   ├── layouts/               # App layouts (DashboardLayout with sidebar)
│   ├── pages/                 # All page-level components
│   │   ├── LandingPage.tsx    # Public landing / marketing page
│   │   ├── AuthPage.tsx       # Login & Signup
│   │   ├── Dashboard.tsx      # Main dashboard overview
│   │   ├── SalarySplitting.tsx # Salary split configuration
│   │   ├── TripleGuard.tsx    # Behavioral guardrail flow
│   │   ├── QuarterlyPulse.tsx # 🔒 PRO — Financial pulse tracking
│   │   ├── Portfolio.tsx      # Portfolio holdings view
│   │   ├── News.tsx           # Financial news feed
│   │   ├── Learning.tsx       # 🔒 PRO — Learning hub
│   │   ├── AICoach.tsx        # 🔒 PRO — AI wealth coach
│   │   ├── RiskProfile.tsx    # Risk appetite selection
│   │   └── UserProfile.tsx    # User settings & profile
│   ├── store/
│   │   └── useAppStore.ts     # Zustand global state store
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx                # Root component with routing
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles & Tailwind directives
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.ts             # Vite build configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

---

## 🎨 Design Philosophy

SalaryPilot follows a **premium dark-mode** aesthetic inspired by professional financial terminals:

- **Glassmorphism** — Frosted glass cards with `backdrop-blur` and subtle borders
- **Ambient Glow** — Soft emerald and blue gradients creating depth
- **Micro-animations** — Smooth transitions powered by Framer Motion
- **Responsive Layout** — Sidebar navigation with rounded panels and custom scrollbars
- **Premium Typography** — Clean font hierarchy with tracking and weight variations

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Aditya-MP/salary_Pilot_web_app.git

# Navigate to the project directory
cd salary_Pilot_web_app

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Type-check and build
npm run build

# Preview the production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 🛡️ State Management

SalaryPilot uses **Zustand** for lightweight, scalable state management. The global store (`useAppStore`) manages:

| State | Description |
|-------|-------------|
| `salary` | User's monthly salary |
| `split` | Needs/Wants/Investments split ratio |
| `risk` | Risk profile (conservative / balanced / aggressive) |
| `pulse` | Quarterly Pulse tracking data (Ball → Strike → Out) |
| `streakCount` | Consecutive disciplined decisions |
| `holdings` | Portfolio allocation (equity, crypto, ESG) |
| `marketTrend` | AI-analyzed market trend data |
| `decisionLog` | History of financial decisions with guard scores |
| `userProfile` | Personal info, banks, and UPI IDs |
| `isPremium` | Premium subscription status |

---

## 🔐 Route Protection

Routes are protected based on authentication and subscription status:

```
Public Routes:
  /              → Landing Page
  /login         → Auth Page
  /signup         → Auth Page

Protected Routes (requires onboarding):
  /dashboard              → Main Dashboard
  /dashboard/salary-splitting → Salary Split Config
  /dashboard/risk-profile  → Risk Profile Selection
  /dashboard/triple-guard  → Triple Guard Flow
  /dashboard/portfolio     → Portfolio Tracker
  /dashboard/news          → News Feed
  /dashboard/profile       → User Profile

Premium Routes (requires PRO):
  /dashboard/quarterly-pulse → Quarterly Pulse
  /dashboard/learning        → Learning Hub
  /dashboard/ai-coach        → AI Wealth Coach
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and not currently licensed for public distribution.

---

<p align="center">
  <strong>SalaryPilot</strong> — Discipline meets intelligence. Your salary, on autopilot. ✈️
</p>
