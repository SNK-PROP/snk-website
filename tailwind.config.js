/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Enhanced Spacing System following 8pt grid
      spacing: {
        '0.5': '0.125rem',  // 4px (0.5 * 8)
        '1': '0.5rem',      // 8px (1 * 8)
        '1.5': '0.75rem',   // 12px (1.5 * 8)
        '2': '1rem',        // 16px (2 * 8)
        '2.5': '1.25rem',   // 20px (2.5 * 8)
        '3': '1.5rem',      // 24px (3 * 8)
        '3.5': '1.75rem',   // 28px (3.5 * 8)
        '4': '2rem',        // 32px (4 * 8)
        '5': '2.5rem',      // 40px (5 * 8)
        '6': '3rem',        // 48px (6 * 8)
        '7': '3.5rem',      // 56px (7 * 8)
        '8': '4rem',        // 64px (8 * 8)
        '9': '4.5rem',      // 72px (9 * 8)
        '10': '5rem',       // 80px (10 * 8)
        '11': '5.5rem',     // 88px (11 * 8)
        '12': '6rem',       // 96px (12 * 8)
        '14': '7rem',       // 112px (14 * 8)
        '16': '8rem',       // 128px (16 * 8)
        '18': '9rem',       // 144px (18 * 8)
        '20': '10rem',      // 160px (20 * 8)
        '24': '12rem',      // 192px (24 * 8)
        '28': '14rem',      // 224px (28 * 8)
        '32': '16rem',      // 256px (32 * 8)
        '36': '18rem',      // 288px (36 * 8)
        '40': '20rem',      // 320px (40 * 8)
        '44': '22rem',      // 352px (44 * 8)
        '48': '24rem',      // 384px (48 * 8)
        '56': '28rem',      // 448px (56 * 8)
        '64': '32rem',      // 512px (64 * 8)
        '72': '36rem',      // 576px (72 * 8)
        '80': '40rem',      // 640px (80 * 8)
        '96': '48rem',      // 768px (96 * 8)
        '112': '56rem',     // 896px (112 * 8)
        '128': '64rem',     // 1024px (128 * 8)
        '144': '72rem',     // 1152px (144 * 8)
        '160': '80rem',     // 1280px (160 * 8)
        '192': '96rem',     // 1536px (192 * 8)

        // Custom spacing for consistent components
        'section': '5rem',
        'section-lg': '6rem',
        'container': '6rem',
        'container-lg': '8rem',
        'card': '2rem',
        'card-lg': '3rem',
        'form': '1.5rem',
        'btn': '0.5rem',
        'btn-lg': '0.75rem',
      },
      // Enhanced Container and Width Utilities
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1280px',
          '3xl': '1440px',
          '4xl': '1536px',
        },
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '1024px',
        '11xl': '1152px',
        '12xl': '1280px',
        '13xl': '1408px',
        '14xl': '1536px',
        '15xl': '1664px',
        '16xl': '1792px',
        '17xl': '1920px',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
        'screen-3xl': '1920px',
        'screen-4xl': '2560px',
      },
      colors: {
        /* Brand Colors */
        brand: {
          blue: '#1e3a8a',
          gold: '#d97706',
          'gold-light': '#f59e0b',
        },
        brandBlue: '#1e3a8a',
        brandGold: '#d97706',

        /* Semantic Colors with HSLA fallbacks */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',

        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',

        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',

        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        /* Legacy Colors */
        primary: {
          blue: '#1e3a8a',
          DEFAULT: '#1e3a8a',
        },
        gold: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
          DEFAULT: '#d97706',
        },
        text: {
          dark: '#111827',
          medium: '#6b7280',
        },
        bg: {
          light: '#f9fafb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains_Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '1rem',
            lineHeight: '1.5',
            color: 'hsl(var(--foreground))',
            maxWidth: '65ch',
            margin: '0 auto',
            '& h1': {
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              fontWeight: '700',
              marginTop: '0',
              marginBottom: '1.5rem',
            },
            '& h2': {
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              lineHeight: '1.3',
              letterSpacing: '-0.01em',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            '& h3': {
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              lineHeight: '1.4',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            '& h4': {
              fontSize: '1.125rem',
              lineHeight: '1.4',
              fontWeight: '600',
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },
            '& h5': {
              fontSize: '1rem',
              lineHeight: '1.4',
              fontWeight: '600',
              marginTop: '1rem',
              marginBottom: '0.5rem',
            },
            '& h6': {
              fontSize: '0.875rem',
              lineHeight: '1.4',
              fontWeight: '600',
              marginTop: '0.875rem',
              marginBottom: '0.5rem',
            },
            '& p': {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.6',
            },
            '& ul, & ol': {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            '& li': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            '& blockquote': {
              margin: '1.5rem 0',
              paddingLeft: '1.5rem',
              borderLeft: '4px solid hsl(var(--border))',
              fontStyle: 'italic',
            },
            '& pre': {
              margin: '1.5rem 0',
              backgroundColor: 'hsl(var(--muted))',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            '& code': {
              fontSize: '0.875rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              backgroundColor: 'hsl(var(--muted))',
              fontFamily: 'JetBrains_Mono',
            },
            '& a': {
              color: 'hsl(var(--primary))',
              textDecoration: 'underline',
              textDecorationColor: 'hsla(var(--primary), 0.3)',
              '&:hover': {
                textDecorationColor: 'hsl(var(--primary))',
              },
            },
          },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'pulse-fast': 'pulse 2s ease-in-out infinite',
        'slide-in-up': 'slideInUp 0.8s ease-out forwards',
        'slide-in-down': 'slideInDown 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'rotate-subtle': 'rotateSubtle 8s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-50px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotateSubtle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% center',
          },
          '100%': {
            backgroundPosition: '200% center',
          },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(217, 119, 6, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(217, 119, 6, 0.6)',
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      /* Custom border-radius utilities */
      borderRadius: {
        'custom-sm': 'calc(var(--radius-sm) * 0.25)',
        'custom': 'var(--radius)',
        'custom-md': 'var(--radius)',
        'custom-lg': 'var(--radius-lg)',
        'custom-xl': 'var(--radius-xl)',
        'custom-2xl': 'var(--radius-2xl)',
      },
      /* Enhanced Spacing utilities */
      spacing: {
        'card': '2rem',
        'card-lg': '3rem',
        'form': '1.5rem',
      },
      // Enhanced Responsive Breakpoints
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      // Enhanced Container Padding
      padding: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
      // Enhanced Line Height
      lineHeight: {
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      // Enhanced Letter Spacing
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      // Enhanced Border Radius
      borderRadius: {
        'custom-sm': 'calc(var(--radius-sm) * 0.25)',
        'custom': 'var(--radius)',
        'custom-md': 'var(--radius)',
        'custom-lg': 'var(--radius-lg)',
        'custom-xl': 'var(--radius-xl)',
        'custom-2xl': 'var(--radius-2xl)',
        'none': '0',
        'full': '9999px',
      },
      // Enhanced Gap utilities
      gap: {
        '0.5': '0.125rem',
        '1': '0.5rem',
        '1.5': '0.75rem',
        '2': '1rem',
        '2.5': '1.25rem',
        '3': '1.5rem',
        '3.5': '1.75rem',
        '4': '2rem',
        '5': '2.5rem',
        '6': '3rem',
        '8': '4rem',
        '10': '5rem',
        '12': '6rem',
        '16': '8rem',
      },
    },
  },
  plugins: [],
}