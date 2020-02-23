import { createAction, createReducer, Dispatch } from 'redux-act'

interface IState {
	projects: any[]
	files: any[]
	validationResults: object
}

const initialState: IState = {
	projects: [],
	files: [],
	validationResults: {},
}

const reducer = createReducer<typeof initialState>({}, initialState)

export const getProjects = createAction<any, 'GET_PROJECTS'>('GET_PROJECTS')
export const postFiles = createAction<any, 'POST_FILES'>('POST_FILES')
export const stateValidation = createAction<object, 'STATE_VALIDATION'>('STATE_VALIDATION')

reducer.on(getProjects, (state: IState, projects: any[] = []) => ({
	...state,
	projects: [...projects],
}))

reducer.on(postFiles, (state: IState, files: any[] = []) => ({
	...state,
	files: [...files],
}))

reducer.on(stateValidation, (state: IState, validationResults: object = []) => ({
	...state,
	validationResults: { ...validationResults },
}))

export const postFilesAsync = (files: any[]): any => (dispatch: Dispatch) => {
	dispatch(postFiles(files))
	return Promise.resolve(files)
}

export default reducer
