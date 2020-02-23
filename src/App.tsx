import React from 'react'
import { getProjects } from './reducers/data.reducer'
import { dispatch } from './store'
import Main from './components/Main'

export default class App extends React.Component<{}, {}> {
	body: HTMLElement
	timer: number

	constructor(props: any) {
		super(props)

		this.body = document.body
		this.timer = 0

		this.handleScroll = this.handleScroll.bind(this)
	}

	handleScroll() {
		clearTimeout(this.timer)
		if (!this.body.classList.contains('disable-hover')) {
			this.body.classList.add('disable-hover')
		}

		this.timer = setTimeout(() => this.body.classList.remove('disable-hover'), 500)
	}

	handleMessage(ev: MessageEvent) {
		// console.log(ev.data)
		if (ev.data.projects) {
			dispatch(getProjects(ev.data.projects))
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
		window.addEventListener('message', this.handleMessage)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
		window.removeEventListener('message', this.handleMessage)
	}

	render() {
		return <Main />
	}
}
