/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ บังคับให้ใช้ dark mode แบบ class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ถ้าเป็น React/Next.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
