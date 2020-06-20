import { createAction, createReducer } from 'redux-act'

interface IState {
	projects: Array<IProject>
}

const initialState: IState = {
	projects: [],
}

export const reducer = createReducer<typeof initialState>({}, initialState)

export const getProjects = createAction<Array<IProject>, 'GET_PROJECTS'>('GET_PROJECTS')

reducer.on(getProjects, (state: IState, projects: Array<IProject>) => ({
	...state,
	projects: [...projects],
}))
