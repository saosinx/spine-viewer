import { createAction, createReducer } from 'redux-act'

type ThemeMode = 'light' | 'dark'

interface IThemeReducer {
	value: ThemeMode
}

const initialState: IThemeReducer = {
	value: (localStorage.getItem('theme') as ThemeMode) || 'light',
}

export const reducer = createReducer<typeof initialState>({}, initialState)

export const setTheme = createAction<ThemeMode, 'SET_THEME'>('SET_THEME')

reducer.on(setTheme, (state, value) => {
	return {
		...state,
		value,
	}
})
