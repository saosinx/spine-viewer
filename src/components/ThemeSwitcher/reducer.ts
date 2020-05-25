import { createAction, createReducer } from 'redux-act'

interface IThemeReducer {
	value: string
}

const initialState: IThemeReducer = {
	value: (localStorage.getItem('theme') as string) || 'light',
}

export const reducer = createReducer<typeof initialState>({}, initialState)

export const setTheme = createAction<string, 'SET_THEME'>('SET_THEME')

reducer.on(setTheme, (state, value) => {
	return {
		...state,
		value,
	}
})
