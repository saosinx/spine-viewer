import { createAction, createReducer, Dispatch } from 'redux-act'

interface IState {
	projects: IProject[]
	files: IFileList
	validationResults: IValidation
}

const initialState: IState = {
	projects: [],
	files: [],
	validationResults: {},
}

const reducer = createReducer<typeof initialState>({}, initialState)

export const getProjects = createAction<IProject[], 'GET_PROJECTS'>('GET_PROJECTS')
export const postFiles = createAction<IFileList, 'POST_FILES'>('POST_FILES')
export const stateValidation = createAction<IValidation, 'STATE_VALIDATION'>('STATE_VALIDATION')

reducer.on(getProjects, (state: IState, projects: IProject[] = []) => ({
	...state,
	projects: [...projects],
}))

reducer.on(postFiles, (state: IState, files: IFileList = []) => ({
	...state,
	files: [...files],
}))

reducer.on(stateValidation, (state: IState, validationResults: IValidation = {}) => ({
	...state,
	validationResults: { ...validationResults },
}))

export const postFilesAsync = (files: IFileList): any => (dispatch: Dispatch) => {
	dispatch(postFiles(files))
	return Promise.resolve(files)
}

export default reducer
