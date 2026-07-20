/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sarabun', 'Noto Sans Thai', 'Tahoma', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          ink: '#1f2937',
          navy: '#1e3a5f',
          blue: '#2563eb',
          sky: '#e0f2fe',
          mint: '#dcfce7',
          green: '#15803d',
        },
      },
    },
  },
  plugins: [],
};
