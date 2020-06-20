import React, { useEffect } from 'react'
import Main from '../components/Main'
import ThemeSwitcher from '../components/ThemeSwitcher'

export const App = () => {
	useEffect(() => {
		const body: HTMLElement = document.body
		let timer: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000)

		function handleScroll(): void {
			clearTimeout(timer)

			if (!body.classList.contains('disable-hover')) {
				body.classList.add('disable-hover')
			}

			timer = setTimeout(() => body.classList.remove('disable-hover'), 500)
		}

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<ThemeSwitcher />
			<Main />
		</>
	)
}
