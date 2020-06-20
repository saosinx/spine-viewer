import { createAction, createReducer } from 'redux-act'

export enum Themes {
	light = 'light',
	dark = 'dark',
}

export type ThemeMode = Themes.light | Themes.dark

interface IThemeReducer {
	value: ThemeMode
}

const initialState: IThemeReducer = {
	value: (localStorage.getItem('theme') as ThemeMode) || Themes.light,
}

export const reducer = createReducer<typeof initialState>({}, initialState)

export const setTheme = createAction<ThemeMode, 'SET_THEME'>('SET_THEME')

reducer.on(setTheme, (state, value) => {
	return {
		...state,
		value,
	}
})
