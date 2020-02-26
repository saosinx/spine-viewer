import { createAction, createReducer, Dispatch } from 'redux-act'

export interface IState {
	projectName: string
	spineName: string
	animation: string
	skin: string
}

const initialState: IState = {
	projectName: '',
	animation: '',
	spineName: '',
	skin: '',
}

export const setAnimation = createAction<any, 'SET_ANIMATION'>('SET_ANIMATION')

const reducer = createReducer({}, initialState)

reducer.on(setAnimation, (state, { projectName, animation, spineName, skin }) => ({
	...state,
	projectName,
	animation,
	spineName,
	skin,
}))

export const setAnimationAsync = (state: IState): any => (dispatch: Dispatch) => {
	dispatch(setAnimation(state))
	return Promise.resolve(state)
}

export default reducer
