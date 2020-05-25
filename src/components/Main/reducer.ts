import { createAction, createReducer } from 'redux-act'

interface IState {
	projects: IProject[]
}

const initialState: IState = {
	projects: [],
}

export const reducer = createReducer<typeof initialState>({}, initialState)

export const getProjects = createAction<IProject[], 'GET_PROJECTS'>('GET_PROJECTS')

reducer.on(getProjects, (state: IState, projects: IProject[]) => ({
	...state,
	projects: [...projects],
}))
