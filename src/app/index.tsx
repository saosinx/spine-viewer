import React from 'react'
import Main from '../components/Main'
import ThemeSwitcher from '../components/ThemeSwitcher'

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

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	render() {
		return (
			<>
				<ThemeSwitcher />
				<Main />
			</>
		)
	}
}
