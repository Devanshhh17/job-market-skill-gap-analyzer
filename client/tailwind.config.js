/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        // Purple primary
        primary: {
          DEFAULT: '#8b5cf6',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          900: '#4c1d95',
        },
        // Cyan accent
        accent: {
          DEFAULT: '#22d3ee',
          400: '#22d3ee',
          500: '#06b6d4',
        },
        // Deep midnight
        midnight: {
          50: '#f8fafc',
          900: '#0f172a',
          950: '#020617'
        },
        // Glass colors
        glass: {
          border: 'rgba(255, 255, 255, 0.1)',
          fill: 'rgba(255, 255, 255, 0.05)',
        }
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.04)',
        premium: '0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'premium-glow': '0 0 30px rgba(139, 92, 246, 0.2), 0 0 60px rgba(34, 211, 238, 0.15)',
        'premium-dark': '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'elevated': '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 1px rgba(255, 255, 255, 0.1)',
        'neon-purple': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
        'neon-cyan': '0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3)',
        'neon-green': '0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)',
        'neon-red': '0 0 10px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0a0a0f 0%, #151520 50%, #0a0a0f 100%)',
        'gradient-subtle': 'radial-gradient(circle at 12% 18%, rgba(139, 92, 246, 0.08), transparent 30%), radial-gradient(circle at 88% 82%, rgba(34, 211, 238, 0.06), transparent 35%), linear-gradient(168deg, #0a0a0f 0%, #11111a 50%, #0a0a0f 100%)',
        'gradient-glow': 'radial-gradient(circle at 15% 20%, rgba(139, 92, 246, 0.15), transparent 35%), radial-gradient(circle at 85% 75%, rgba(34, 211, 238, 0.12), transparent 40%)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 3s',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)' }
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      spacing: {
        'section': '6rem',
        'hero': '8rem'
      }
    }
  },
  plugins: []
}
