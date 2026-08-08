/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0F5FF",
          100: "#E0EAFF",
          200: "#C7D7FE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          900: "#0F172A",
        },
        navy: {
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        "glass-hover":
          "0 12px 40px 0 rgba(31, 38, 135, 0.12)",
        glow: "0 0 20px -5px rgba(59, 130, 246, 0.5)",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": {
            opacity: 1,
            transform: "scale(1)",
          },
          "50%": {
            opacity: 0.85,
            transform: "scale(1.03)",
          },
        },
        wave: {
          "0%, 100%": {
            height: "8px",
          },
          "50%": {
            height: "28px",
          },
        },
      },
      animation: {
        "pulse-slow": "pulseSlow 4s infinite ease-in-out",
        "wave-bar": "wave 1.2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};