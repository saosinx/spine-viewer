import 'styled-components'

declare module 'styled-components' {
	export interface IDefaultTheme {
		colors: {
			alabaster: string
			alto: string
			anakiwa: string
			black65: string
			black85: string
			cashmere: string
			dodgerBlue: string
			peachOrange: string
			punch: string
			sanMarino: string
			scienceBlue: string
			snowy: string
			white: string
		},
	}

	export interface ITheme extends IDefaultTheme {}
}
