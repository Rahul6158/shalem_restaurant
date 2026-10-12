# Shalem Restaurant 🍽️

A modern, responsive, mobile-first frontend web application for **Shalem Restaurant** (Valluru, Andhra Pradesh). Features full menu browsing, virtual interactive menu booklet, instant WhatsApp order & catering booking system, customer reviews, and a client-side staff admin management dashboard.

---

## 🚀 Features

- **Mobile-First & Responsive**: Tailored for mobile visitors, tablets, and desktop screens.
- **Direct WhatsApp Ordering**: Place takeout orders and customize quantities directly on WhatsApp.
- **Interactive Catering Planner**: Inquire for weddings, birthdays, and parties with custom dish selections.
- **Virtual 3D Menu Booklet**: Realistic multi-page flipping menu booklet.
- **Staff Admin Dashboard (`/admin.html`)**: Manage store opening/closure status, catering menu items, customer enquiries, gallery photos, and reviews directly from your browser via `localStorage` (Default PIN: `1234`).
- **Zero Backend Required**: 100% pure client-side architecture ready to host anywhere.

---

## 📁 Project Structure

```text
├── assets/
│   └── images/            # Restaurant branding, food photos, banners
├── data/                  # Initial baseline JSON data (menu, settings, gallery, etc.)
├── dist/                  # Optimized production build artifacts
├── index.html             # Main customer landing page & ordering portal
├── admin.html             # Staff administration dashboard
├── style.css              # Custom styling & animations
├── script.js              # Client-side interactivity & WhatsApp integration
├── vite.config.js         # Multi-page Vite build configuration
├── vercel.json            # 1-Click configuration for Vercel
├── netlify.toml           # 1-Click configuration for Netlify
├── package.json           # Scripts & dev dependencies
└── README.md
```

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5150](http://localhost:5150) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized, minified bundle in the `dist/` directory including both `index.html` and `admin.html`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Direct Hosting Guide

This project is 100% frontend and requires **no backend server or database setup**. You can deploy it to any provider in seconds:

### 1. Vercel (Recommended)
1. Push your code to GitHub / GitLab / Bitbucket.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository.
4. Vercel will automatically detect the settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### 2. Netlify
1. Go to [Netlify](https://www.netlify.com/) and click **Add new site** > **Import an existing project**.
2. Select your repository.
3. The included `netlify.toml` automatically configures:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy**.

### 3. GitHub Pages
#### Option A: Deploy with GitHub Actions (Recommended)
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
3. Use the standard static/Vite workflow to publish `dist/`.

#### Option B: Direct Static Hosting
Since all assets and scripts are relative, you can also publish the repository root directly to GitHub Pages:
1. In repository **Settings** > **Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**.

### 4. Cloudflare Pages / Render / Firebase Hosting
- **Build command**: `npm run build`
- **Output directory**: `dist`
