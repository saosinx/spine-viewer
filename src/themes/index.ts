import { ITheme } from 'styled-components/macro'
import { default as light } from './light'
import { default as dark } from './dark'

interface IGlobalTheme {
	[key: string]: ITheme
}

const theme: IGlobalTheme = {
	light,
	dark
}

export { theme }
