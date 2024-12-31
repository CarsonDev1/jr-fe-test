import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			fontFamily: {
				oswald: ['Oswald', 'sans-serif'],
				beVnPro: ['Be Vietnam Pro', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
export default config;
