import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import configureStore from './store'
import { theme } from './themes'
import App from './app'
import * as serviceWorker from './serviceWorker'

const GlobalStyles = createGlobalStyle`
	* {
		background-color: transparent;
		border: 0;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		font-style: inherit;
		font-weight: inherit;
		line-height: inherit;
		margin: 0;
		padding: 0;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}

	html {
		box-sizing: border-box;
		font-size: 16px;
		font-weight: 400;
		line-height: 1;
	}

	body {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
		font-kerning: normal;
		font-size: inherit;
		overflow-y: hidden;

		.disable-hover,
		.disable-hover * {
  		pointer-events: none !important;
		}
	}

	.ant-tooltip-inner {
		max-height: 31.25rem;
		overflow-y: auto;
	}
`

const store = configureStore()

const render = function () {
	ReactDOM.render(
		<Provider store={store}>
			<ThemeProvider theme={store.getState().theme.value === 'light' ? theme.light : theme.dark}>
				<>
					<GlobalStyles />
					<App />
				</>
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
