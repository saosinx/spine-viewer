import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { default as canvas } from './canvas.reducer'
import { default as data } from './data.reducer'

const reducers = combineReducers({
	data,
	canvas,
})

export type RootState = StateType<typeof reducers>

export default reducers
