/** tailwind.config.js */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      // Có thể thêm custom typography nếu cần
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#e2e8f0', // text-slate-200
            a: {
              color: '#a855f7', // text-purple-500
              '&:hover': {
                color: '#9333ea', // text-purple-600
              },
            },
            h1: {
              color: '#f1f5f9', // text-slate-100
            },
            h2: {
              color: '#f1f5f9',
            },
            h3: {
              color: '#f1f5f9',
            },
            h4: {
              color: '#f1f5f9',
            },
            code: {
              color: '#f472b6', // text-pink-400
              backgroundColor: '#1e293b', // bg-slate-800
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
            },
            pre: {
              backgroundColor: '#1e293b',
              border: '1px solid rgba(147, 51, 234, 0.2)',
            },
            blockquote: {
              borderLeftColor: '#a855f7',
              backgroundColor: 'rgba(147, 51, 234, 0.1)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Thêm plugin này
  ],
}
