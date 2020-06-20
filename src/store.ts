import { createStore, combineReducers, applyMiddleware, compose, Store, Action } from 'redux'
import { StateType } from 'typesafe-actions'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { reducer as init } from './components/Main'
import { reducer as project } from './components/Controls/ButtonGroup'
import { reducer as theme } from './components/ThemeSwitcher'
import { reducer as validation } from './components/Controls'

const reducers = combineReducers({
	init,
	project,
	theme,
	validation,
})

let store: Store
const configureStore = (): Store => {
	const middlewares = [thunk]
	const enchancers = composeWithDevTools(applyMiddleware(...middlewares))
	store = createStore(reducers, compose(enchancers))
	return store
}

export type RootState = StateType<typeof reducers>

export const dispatch = <T>(action: Action<T>): Action<T> => store.dispatch(action)

export default configureStore
