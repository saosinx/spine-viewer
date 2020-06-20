export interface ITheme {
	[key: string]: string
	name: string
}

export const themes: Array<ITheme> = [
	{
		'--alabaster': '#fafafa',
		'--alto': '#d9d9d9',
		'--anakiwa': '#82d6fe',
		'--black': '#000',
		'--black-65': 'rgba(0, 0, 0, 0.65)',
		'--black-85': 'rgba(0, 0, 0, 0.85)',
		'--cashmere': '#e8cda5',
		'--dodger-blue': '#40a9ff',
		'--macaroni-and-cheese': '#feb37c',
		'--peach-orange': '#ffcf96',
		'--peach': '#ffcba4',
		'--pomegrana-tea': '#ee3737',
		'--punch': '#dc3545',
		'--red': '#ff0000',
		'--san-marino': '#436a9f',
		'--science-blue': '#096dd9',
		'--snowy': '#fff',
		'--white': '#fff',
		name: 'light',
	},
	{
		'--alabaster': '#1d1d1d',
		'--alto': '#434343',
		'--anakiwa': '#8ecfeb',
		'--black': '#fff',
		'--black-65': 'rgba(255, 255, 255, 0.65)',
		'--black-85': 'rgba(255, 255, 255, 0.85)',
		'--cashmere': '#e8cda5',
		'--dodger-blue': '#40a9ff',
		'--macaroni-and-cheese': '#feb37c',
		'--peach-orange': '#ffcf96',
		'--peach': '#ffcba4',
		'--pomegrana-tea': '#cd0a0a',
		'--punch': '#dc3545',
		'--red': '#ff0000',
		'--san-marino': '#436a9f',
		'--science-blue': '#096dd9',
		'--snowy': '#141414',
		'--white': '#000',
		name: 'dark',
	},
]
