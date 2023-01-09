/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["index.html", "js/main.js"],
	theme: {
		extend: {
			colors: {
				whiskey: {
					DEFAULT: "#D3A669",
					50: "#FDFAF7",
					100: "#F8F1E7",
					200: "#EFDEC8",
					300: "#E6CBA8",
					400: "#DCB989",
					500: "#D3A669",
					600: "#C68C3E",
					700: "#9E6E2E",
					800: "#725021",
					900: "#473215",
				},
			},
		},
	},
	plugins: [],
};
