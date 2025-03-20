/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/app/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          imfell: ['var(--font-im-fell-english)', 'serif'],
        },
      },
    },
    plugins: [],
  }
  