import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components/macro'
import configureStore from './store'
import { theme } from './themes'
import { App } from './app'
import * as serviceWorker from './serviceWorker'

import './index.scss'

const store = configureStore()

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<ThemeProvider theme={store.getState().theme.value === 'light' ? theme.light : theme.dark}>
				<App />
			</ThemeProvider>
		</Provider>,
		document.getElementById('root')
	)
}

render()
store.subscribe(() => render())

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
