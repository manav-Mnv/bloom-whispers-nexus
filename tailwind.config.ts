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
				display: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
				body: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
				devanagari: ['Noto Sans Devanagari', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))',
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
				wellness: {
					calm: 'hsl(var(--wellness-calm))',
					energy: 'hsl(var(--wellness-energy))',
					focus: 'hsl(var(--wellness-focus))',
					balance: 'hsl(var(--wellness-balance))',
				},
				confession: {
					bg: 'hsl(var(--confession-bg))',
					card: 'hsl(var(--confession-card))',
					accent: 'hsl(var(--confession-accent))',
				}
			},
			backgroundImage: {
				'gradient-wellness': 'var(--gradient-wellness)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-confession': 'var(--gradient-confession)',
			},
			boxShadow: {
				soft: 'var(--shadow-soft)',
				medium: 'var(--shadow-medium)',
				strong: 'var(--shadow-strong)',
				glow: 'var(--shadow-glow)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				pulse: {
					'0%, 100%': { opacity: 1 },
					'50%': { opacity: 0.5 },
				},
				'fade-in': {
					'0%': { opacity: 0, transform: 'translateY(20px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
				'fade-in-up': {
					'0%': { opacity: 0, transform: 'translateY(30px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
				'slide-in': {
					'0%': { opacity: 0, transform: 'translateX(-100%)' },
					'100%': { opacity: 1, transform: 'translateX(0)' },
				},
				'scale-in': {
					'0%': { opacity: 0, transform: 'scale(0.9)' },
					'100%': { opacity: 1, transform: 'scale(1)' },
				},
				'bounce-in': {
					'0%': { opacity: 0, transform: 'scale(0.3)' },
					'50%': { opacity: 1, transform: 'scale(1.1)' },
					'70%': { transform: 'scale(0.9)' },
					'100%': { transform: 'scale(1)' },
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				float: 'float 6s ease-in-out infinite',
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'gradient-shift': 'gradient-shift 3s ease infinite',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
