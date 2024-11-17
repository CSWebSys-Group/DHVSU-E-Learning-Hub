/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			brand: {
    				'100': '#C17171',
    				'200': '#A94C4C',
    				'300': '#924444',
    				'400': '#6D3636',
    				'500': '#562424',
    				DEFAULT: '#701D0B'
    			},
    			background: 'hsl(var(--background))',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		boxShadow: {
    			'drop-1': '0px 10px 30px 0px rgba(66, 71, 97, 0.1)',
    			'drop-2': '0 8px 30px 0 rgba(65, 89, 214, 0.3)',
    			'drop-3': '0 8px 30px 0 rgba(65, 89, 214, 0.1)'
    		},
    		fontFamily: {
    			poppins: ['var(--font-poppins)']
    		}
    	}
    },
    plugins: [require('tailwindcss-animate')],
  };
  