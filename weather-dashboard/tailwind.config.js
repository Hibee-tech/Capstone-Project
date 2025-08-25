// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "background-gradient": "var(--color-background-gradient)",
        foreground: "var(--color-foreground)",
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",

        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",

        popover: "var(--color-popover)",
        "popover-foreground": "var(--color-popover-foreground)",

        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",

        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",

        secondary: "var(--color-secondary)",
        "secondary-foreground": "var(--color-secondary-foreground)",

        destructive: "var(--color-destructive)",
        "destructive-foreground": "var(--color-destructive-foreground)",

        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-accent-foreground)",

        success: "var(--color-success)",
        "success-foreground": "var(--color-success-foreground)",

        warning: "var(--color-warning)",
        "warning-foreground": "var(--color-warning-foreground)",

        error: "var(--color-error)",
        "error-foreground": "var(--color-error-foreground)",

        surface: "var(--color-surface)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2563EB, #3B82F6)",
        "gradient-accent": "linear-gradient(135deg, #F59E0B, #FBBF24)",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0,0,0,0.05)",
        popover: "0 10px 15px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        lg: "0.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      minHeight: {
        screen: "100vh",
      },
    },
  },
  plugins: [],
};
