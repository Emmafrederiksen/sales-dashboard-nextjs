/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#26215C',
          light: '#534AB7',
          hover: '#1a1640',
        },
        accent: {
          purple: '#EEEDFE',
          green: '#E1F5EE',
          amber: '#FAEEDA',
          blue: '#E6F1FB',
        },
        kpi: {
          purple: '#534AB7',
          green: '#1D9E75',
          amber: '#BA7517',
          blue: '#378ADD',
          red: '#D85A30',
        },
        sidebar: '#16213E',
      },
      fontSize: {
        'kpi-label': ['clamp(0.625rem, 1vw, 0.6875rem)', { letterSpacing: '0.05em' }],      // 10px to 11px
        'kpi-value': ['clamp(1.125rem, 2vw, 1.375rem)', { letterSpacing: '-0.02em' }],      // 18px to 22px
        'card-title': ['clamp(0.75rem, 1.5vw, 0.8125rem)', { fontWeight: '500' }],          // 12px to 13px 
        'table-header': ['clamp(0.5625rem, 1vw, 0.625rem)', { letterSpacing: '0.04em' }],   // 9px to 10px
      }
    },
  },
  plugins: [],
}