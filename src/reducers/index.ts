import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { default as control } from './control.reducer'
import { default as data } from './data.reducer'

const reducers = combineReducers({
	data,
	control,
})

export type RootState = StateType<typeof reducers>

export default reducers
