export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#FF7A00',
        secondary: '#FFFFFF',
        accent: '#D4AF37',
        background: '#FFF8F0',
        ink: '#24160A',
        muted: '#6F6258',
        border: '#F0DEC8',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 18px 50px rgba(36, 22, 10, 0.1)',
        glow: '0 14px 34px rgba(255, 122, 0, 0.22)',
      },
      borderRadius: {
        card: '0.75rem',
      },
    },
  },
  plugins: [],
}
