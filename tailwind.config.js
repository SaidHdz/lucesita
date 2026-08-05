export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#111111',
        'bg-card': '#1a1a1a',
        'lilac': '#c8a2c8',
        'lilac-light': '#e6cfe6',
        'lilac-dark': '#8a5a8a',
        'accent': '#d4b8d4',
        'accent-yellow': '#ffd700',
        'text': '#f5f3f0',
      },
      fontFamily: {
        'sans': ['Outfit', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
