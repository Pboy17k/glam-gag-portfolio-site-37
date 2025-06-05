
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
				'playfair': ['Playfair Display', 'serif'],
				'poppins': ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Professional makeup artist colors - cooler tones
				blush: {
					50: '#fef7f4',
					100: '#fdebe4',
					200: '#fbdac9',
					300: '#f7b8a5',
					400: '#f19384',
					500: '#e87969',
					600: '#d55d4e',
					700: '#b34a3d',
					800: '#944037',
					900: '#7b3933',
					950: '#431c18'
				},
				rosegold: {
					50: '#fef6f3',
					100: '#fdeae5',
					200: '#fbdcce',
					300: '#f7c5ab',
					400: '#f1a07a',
					500: '#e87d4a',
					600: '#da5d24',
					700: '#b6471a',
					800: '#933c1a',
					900: '#78341a',
					950: '#41190a'
				},
				lavender: {
					50: '#f9f6ff',
					100: '#f1ebff',
					200: '#e5daff',
					300: '#d1bbff',
					400: '#b792ff',
					500: '#9b65ff',
					600: '#8a3fff',
					700: '#7b28ec',
					800: '#6724c4',
					900: '#541fa1',
					950: '#36106e'
				},
				// Replaced ivory with cooler pearl tones
				pearl: {
					50: '#fefffe',
					100: '#fefefc',
					200: '#fefcf8',
					300: '#fdf9f0',
					400: '#fcf3e4',
					500: '#fae8d1',
					600: '#f4d4a7',
					700: '#e8b875',
					800: '#d49a4a',
					900: '#b8802e',
					950: '#634419'
				},
				peach: {
					50: '#fffaf7',
					100: '#fff3ed',
					200: '#ffe4d4',
					300: '#ffcdb1',
					400: '#ffab7d',
					500: '#ff8547',
					600: '#f06724',
					700: '#c7501a',
					800: '#9e421a',
					900: '#7f3819',
					950: '#451b0b'
				},
				// Replaced champagne with cooler silver tones
				silver: {
					50: '#f9f9f9',
					100: '#f2f2f2',
					200: '#e6e6e6',
					300: '#d1d1d1',
					400: '#b5b5b5',
					500: '#969696',
					600: '#7a7a7a',
					700: '#656565',
					800: '#565656',
					900: '#4a4a4a',
					950: '#2e2e2e'
				},
				wine: {
					50: '#fdf4f8',
					100: '#fce8f2',
					200: '#fad1e6',
					300: '#f6aad0',
					400: '#f075b0',
					500: '#e74792',
					600: '#d42771',
					700: '#b91a5a',
					800: '#98184a',
					900: '#7d1840',
					950: '#4d0821'
				},
				mauve: {
					50: '#faf7fa',
					100: '#f4eef4',
					200: '#e9dee9',
					300: '#d7c4d7',
					400: '#c09fc0',
					500: '#a77fa7',
					600: '#8f638f',
					700: '#775177',
					800: '#634563',
					900: '#533b53',
					950: '#342132'
				},
				// New grey-violet palette
				greyviolet: {
					50: '#faf9fb',
					100: '#f3f1f6',
					200: '#e8e4ed',
					300: '#d6cfdc',
					400: '#beb1c7',
					500: '#a594b0',
					600: '#8d7a98',
					700: '#746580',
					800: '#625669',
					900: '#524956',
					950: '#342f37'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'zoom-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(2deg)' }
				},
				'sparkle': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.5', transform: 'scale(1.2)' }
				},
				'pulse-heart': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'gentle-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out',
				'slide-up': 'slide-up 1s ease-out',
				'zoom-in': 'zoom-in 0.6s ease-out',
				'float': 'float 4s ease-in-out infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'pulse-heart': 'pulse-heart 1.5s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite'
			},
			backgroundImage: {
				'powder-texture': "radial-gradient(circle at 50% 50%, rgba(165, 148, 176, 0.2) 0%, rgba(243, 241, 246, 0.1) 50%, transparent 100%)",
				'luxury-gradient': 'linear-gradient(135deg, #fefffe 0%, #fce8f2 25%, #f1ebff 50%, #fef6f3 75%, #f9f9f9 100%)',
				'dark-luxury': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
