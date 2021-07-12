// Load current theme from local storage
export function loadTheme() {
	var theme = JSON.parse(localStorage.getItem('theme'))
	if (!theme) setDefaultTheme()
	console.log(theme)
	document.body.classList = `${theme.color} ${theme.font}`
}

// Set default theme
function setDefaultTheme() {
	var dark = window.matchMedia('(prefers-color-scheme: dark)').matches
	localStorage.setItem(
		'theme',
		JSON.stringify({
			color: dark ? 'dark' : 'light',
			font: 'sans',
			logo: 'standard',
		})
	)
}

// Set theme
export function setThemeData(key, value) {
	var theme = JSON.parse(localStorage.getItem('theme'))
	theme[key] = value
	localStorage.setItem('theme', JSON.stringify(theme))
	loadTheme()
}

// Themes
export const colorThemes = {
	dark: {
		name: 'Dark',
		desc: 'A standard dark theme',
	},
	light: {
		name: 'Light',
		desc: "A standard light theme for people who don't like their eyes",
	},
}

export const fontThemes = {
	'sans-serif': {
		name: 'Sans',
		desc: 'A bold, modern, and nice UI font',
	},
	serif: {
		name: 'Serif',
		desc: 'A standard font full of gross serifs',
	},
	monospace: {
		name: 'Monospace',
		desc: 'A hacker-esque font for terminals',
	},
	handwritten: {
		name: 'Handwritten',
		desc: 'A font that resembles my handwriting',
	},
}

export const logoThemes = {
	standard: {
		name: 'Standard',
		desc: 'Just plain colored',
	},
	animated: {
		name: 'Animated',
		desc: "Who doesn't like more RGB?",
	},
}
