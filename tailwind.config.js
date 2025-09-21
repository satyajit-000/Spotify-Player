/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  important: true, // Important: This prevents conflicts with Bootstrap/ng-zorro
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Spotify colors for your music dashboard
        spotify: {
          green: '#1DB954',
          'green-light': '#1ed760',
          'green-dark': '#1db954',
          dark: '#191414',
          'dark-light': '#282828',
          gray: {
            900: '#121212',
            800: '#181818', 
            700: '#282828',
            600: '#404040',
            500: '#535353',
            400: '#727272',
            300: '#B3B3B3',
          }
        }
      },
      // Avoid conflicts with Bootstrap spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-green': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  // Disable conflicting base styles
  corePlugins: {
    preflight: false, // Prevents conflicts with Bootstrap normalize/reset
  },
  plugins: [],
}
