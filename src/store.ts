import { createStore, applyMiddleware, compose, Store, Action } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

let store: Store
const configureStore = function() {
	const middlewares = [thunk]
	const enchancers = composeWithDevTools(applyMiddleware(...middlewares))
	store = createStore(reducers, compose(enchancers))
	return store
}

export const dispatch = function(action: Action): any {
	return store.dispatch(action)
}

export default configureStore
