import { createAction, createReducer, Dispatch } from 'redux-act'

export interface IState {
	animation: string
	spine: string
	skin: string
}

const initialState: IState = {
	animation: '',
	spine: '',
	skin: '',
}

export const setControl = createAction<any, 'SET_CONTROL'>('SET_CONTROL')

const reducer = createReducer({}, initialState)

reducer.on(setControl, (state, { animation, spine, skin }) => ({
	...state,
	animation,
	spine,
	skin,
}))

export const setControlAsync = (state: IState): any => (dispatch: Dispatch) => {
	dispatch(setControl(state))
	return Promise.resolve(state)
}

export default reducer
