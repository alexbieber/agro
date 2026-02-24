import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  			heading: ['var(--font-heading)', 'Georgia', 'serif'],
  		},
  		colors: {
  			border: '#E0E0E0',
  			input: '#E0E0E0',
  			ring: '#2E7D32',
  			background: '#FAFAFA',
  			foreground: '#1C1C1C',
  			primary: {
  				DEFAULT: '#2E7D32',
  				light: '#4CAF50',
  				dark: '#1B5E20',
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#6D4C41',
  				light: '#8D6E63',
  				foreground: '#FFFFFF'
  			},
  			accent: {
  				DEFAULT: '#6D4C41',
  				light: '#8D6E63'
  			},
  			offer: '#FF8F00',
  			success: '#388E3C',
  			whatsapp: '#25D366',
  			card: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#1C1C1C'
  			},
  			text: {
  				primary: '#1C1C1C',
  				secondary: '#666666'
  			},
  			destructive: {
  				DEFAULT: '#EF4444',
  				foreground: '#FFFFFF'
  			},
  			muted: {
  				DEFAULT: '#F5F5F5',
  				foreground: '#666666'
  			},
  			popover: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#1C1C1C'
  			}
  		},
  		borderRadius: {
  			lg: '0.5rem',
  			md: 'calc(0.5rem - 2px)',
  			sm: 'calc(0.5rem - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'whatsapp-pulse': {
  				'0%': { transform: 'scale(1)', opacity: '0.5' },
  				'100%': { transform: 'scale(1.15)', opacity: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'whatsapp-pulse': 'whatsapp-pulse 3s ease-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
