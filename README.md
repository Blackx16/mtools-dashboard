# mTools Social Analytics Dashboard

> **Enterprise Multi-Brand Social Media Analytics Command Center with Adaptive Platform Telemetry**

---

## 📌 Overview

**mTools Dashboard** is an enterprise-grade social media command center designed for multi-brand organizations and initiatives—including **A4G (Action for Growth)**, **A4G Intelex**, **GMFER**, and **Muralidhar**.

The platform provides unified social media performance intelligence, cross-platform telemetry normalization, and content exploration across major communication networks: **LinkedIn**, **X (formerly Twitter)**, **Instagram**, and **Facebook**.

---

## ✨ Key Features

1. **Multi-Brand Workspace**: Seamlessly switch between organizational brands. All metrics, connected channels, and published content update instantly.
2. **Unified Checkbox Platform Filter**:
   - Central filter located in the top-right header that drives the entire dashboard.
   - All 4 active platforms (`LinkedIn`, `X`, `Instagram`, `Facebook`) are selected by default.
   - Guaranteed active selection: Guard prevents deselecting the final platform.
   - 1-Click "Reset All" button to restore all channels.
3. **Adaptive Platform-Specific Native Telemetry**:
   - **Single Channel Isolated**: The tab navigation bar is automatically **cut off / hidden**, displaying the channel's native metrics cards directly without clutter.
   - **Multiple Channels Selected**: A tab bar renders buttons **strictly for the checked channels**, omitting unselected networks.
4. **Executive Hero KPI Ribbon**: Real-time rollups for Gross Impressions, Unique Reach, Total Engagements, Blended ER %, Publication Velocity, and Audience Growth—dynamically recalculated based on active channels.
5. **Longitudinal Charts & 72h Velocity**:
   - 30-Day performance evolution across Impressions, Engagements, and Engagement Rate.
   - 72-Hour post decay velocity trajectories.
6. **Content Performance Explorer & A/B Slicing**:
   - Deep-dive into individual posts with real metrics, comments, and engagement breakdowns.
   - Strategic A/B Slice Comparison engine to test content formats (e.g., Carousel vs. Text) and campaign objectives.
7. **Interactive Walkthrough Tour & Guide**:
   - 9-step spotlight tour explaining every component and feature.
   - Comprehensive beginner modal guide explaining metrics and workflows.
8. **1-Click Quick Setup**: Simulates enterprise onboarding and live connection synchronization across all 4 channels.

---

## 💻 Tech Stack

- **Framework**: React 18 (TypeScript)
- **Bundler & Dev Server**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Testing & Browser QA**: Playwright (Headless Chromium)

---

## 🚀 Quickstart

### Prerequisites
- **Node.js**: v18.0.0 or higher (tested on Node v24)
- **npm**: v9.0.0 or higher

### 1. Installation

```bash
cd demo-dashboard
npm install
```

### 2. Run in Development Mode

```bash
npm run dev
```

Open your browser at:
```
http://localhost:5173
```

### 3. Production Build & Preview

```bash
# Typecheck and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

### 4. Automated Browser QA Testing

Run the automated Playwright end-to-end browser test suite:

```bash
cd demo-dashboard
node e2e/browser-qa.mjs
```

---

## 📂 Project Structure

```
.
├── .gitignore
├── README.md
└── demo-dashboard/
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── index.html
    ├── e2e/
    │   └── browser-qa.mjs       # Playwright automated browser QA suite
    └── src/
        ├── App.tsx              # Main dashboard application container
        ├── types.ts             # TypeScript definitions
        ├── data/
        │   └── mockData.ts      # Multi-brand mock data & dynamic calculation engines
        └── components/
            ├── Header.tsx                   # Brand selector, date & checkbox filters
            ├── HeroMetricRibbon.tsx         # Executive KPI summary ribbon
            ├── PlatformHealthRibbon.tsx     # Channel integration status & modal
            ├── NativePlatformTabs.tsx       # Adaptive platform-specific telemetry
            ├── LongitudinalCharts.tsx       # 30-day trends & 72h velocity curves
            ├── ContentPerformanceExplorer.tsx # Post performance table & detail modal
            ├── SliceComparisonEngine.tsx    # Strategic A/B slice testing engine
            ├── WalkthroughTour.tsx          # 9-step interactive spotlight tour
            └── DashboardGuideModal.tsx      # Comprehensive beginner guide
```

---

## 📄 License

MIT
