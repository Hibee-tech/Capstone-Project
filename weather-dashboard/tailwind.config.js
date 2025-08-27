/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Futuristic neutrals
        surface: "#0d1117",
        "surface-lighter": "#161b22",
        neon: "#00f5ff",
        glow: "#39ff14",
        gold: "#FFD36E",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
        "gradient-sunset": "linear-gradient(135deg, #ff512f, #dd2476)",
        "gradient-aurora": "linear-gradient(135deg, #00c6ff, #0072ff)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradient: "gradientShift 8s ease infinite",
        "pulse-glow": "pulseGlow 2s infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 5px #00f5ff)" },
          "50%": { opacity: "0.5", filter: "drop-shadow(0 0 15px #39ff14)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
