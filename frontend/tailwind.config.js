/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "paper-canvas": "var(--color-paper-canvas)",
        "paper-structural": "var(--color-paper-structural)",
        "paper-panel": "var(--color-paper-panel)",
        "paper-card": "var(--color-paper-card)",
        "paper-input": "var(--color-paper-input)",
        forest: "var(--color-forest)",
        "forest-deep": "var(--color-forest-deep)",
        oxblood: "var(--color-oxblood)",
        mustard: "var(--color-mustard)",
        ink: "var(--color-ink)",
        "ink-muted": "var(--color-ink-muted)",
        "state-success": "var(--color-state-success)",
        "state-warning": "var(--color-state-warning)",
        "state-error": "var(--color-state-error)",
      },
      fontFamily: {
        editorial: ["Georgia", "Cambria", "Times New Roman", "serif"],
        display: ["Impact", "Arial Narrow", "sans-serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
        body: ["Arial", "Helvetica", "sans-serif"],
      },
      maxWidth: { page: "72rem", reading: "46rem" },
      boxShadow: {
        hard: "var(--shadow-hard)",
        "hard-sm": "var(--shadow-hard-sm)",
        "hard-lg": "var(--shadow-hard-lg)",
      },
      transitionDuration: { fast: "120ms", standard: "180ms" },
      zIndex: { nav: "40", dialog: "80", overlay: "70" },
    },
  },
  plugins: [],
};
