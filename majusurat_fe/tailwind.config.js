/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB', // blue-600
          light: '#3B82F6',   // blue-500
          dark: '#1D4ED8',    // blue-700
        },
        success: {
          DEFAULT: '#16A34A', // green-600
        },
        danger: {
          DEFAULT: '#DC2626', // red-600
        },
        accent: '#F9FAFB', // gray-50
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class', // Aktifkan dark mode via class
}
