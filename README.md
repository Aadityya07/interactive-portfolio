
````markdown
# 🌌 Aditya Yadav | Interactive Cinematic Portfolio

> A highly immersive, narrative-driven personal portfolio built to bridge the gap between advanced web engineering and cinematic storytelling. 

🔗 **[ENTER THE PORTAL (Live Demo)](#)** *(<-- Paste your live Vercel/Netlify link here!)*

![Portfolio Theme](https://img.shields.io/badge/Theme-Sci--Fi%20%2F%20Cinematic-ed1c24?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20GSAP%20%7C%20Vite-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)

## 🚀 The Vision
Standard portfolios are static. This project was built from the ground up to be an **experience**. Inspired by the dark, synth-heavy aesthetics of *Stranger Things*, this application leverages advanced scroll-linked animations, frame-by-frame canvas rendering, and pure glassmorphism UI to showcase my journey as an AI & Data Science undergraduate and Full-Stack Developer.

## ⚡ Core Engineering Features

* **Cinematic Preloader:** A suspenseful, multi-stage loading sequence featuring dynamic progress states, glowing typography, and a staggered typewriter effect that simulates a terminal system breach.
* **Canvas Parallax Engine:** The hero section utilizes a highly optimized HTML5 `<canvas>` to render a 240-frame interactive portal, layered behind mouse-tracking parallax elements.
* **Scroll-Triggered Storytelling:** Built entirely with **GSAP ScrollTrigger**, the site features pinned sections, horizontal "blast door" splits, infinite zoom-throughs, and cinematic crossfades that react precisely to the user's scroll velocity.
* **Unified Premium UI:** A strict design system utilizing pure frosted glassmorphism, precise `backdrop-filter` blurring, and deep crimson (`#ed1c24`) glowing accents to maintain visual consistency.
* **Stateless Contact Gateway:** Integrates Formspree via the `fetch` API for a seamless, backend-less contact form that prevents page redirects and handles loading states dynamically.

## 🛠️ Tech Stack & Architecture

* **Framework:** React.js powered by Vite for lightning-fast HMR and optimized production builds.
* **Animation:** GSAP (GreenSock Animation Platform) + `@gsap/react` hook for highly performant, timeline-based DOM manipulation.
* **Styling:** Modular inline CSS with advanced CSS variables, custom Webkit scrollbar hiding, and robust flexbox/grid architectures.
* **Assets:** Custom compressed frame sequences, curated SVGs, and optimized `.png` background plates.

## ⚙️ Local Setup & Installation

Want to explore the Upside Down locally? Follow these steps:

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Aadityya07/interactive-portfolio.git](https://github.com/Aadityya07/interactive-portfolio.git)
   cd interactive-portfolio
````

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Initialize the Dev Server**

    ```bash
    npm run dev
    ```

4.  **Access the Portal**
    Open your browser and navigate to `http://localhost:5173`

## 🛡️ Security & UX Friction

This repository contains a global `useEffect` hook designed to add UX friction for casual visitors, including:

  * Disabling Context Menus (Right-Click)
  * Preventing Image `dragstart` events
  * Suppressing common Developer Tool shortcuts (F12, Ctrl+Shift+I) in production builds (`import.meta.env.DEV` check).

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details. You are welcome to explore the code to learn GSAP mechanics, but please refrain from copying my personal data, project descriptions, or photos.

-----

### 📡 Establish Connection

**Aditya Yadav** // AI & DS | Full-Stack Developer

  * [LinkedIn](https://www.linkedin.com/in/aditya1610)
  * [GitHub](https://github.com/Aadityya07)
  * [X (Twitter)](https://x.com/AdityaYadavDS)

<!-- end list -->
