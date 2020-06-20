import React, { useState } from 'react'
import cn from 'classnames'

import { dispatch } from '../../store'
import { ITheme, themes } from '../../themes'
import { setTheme, ThemeMode, Themes } from './reducer'

import './styles.scss'

export const ThemeSwitcher = () => {
	const [isChecked, setInputState] = useState(
		localStorage.getItem('theme') === Themes.light ? false : true
	)

	const saveLocalTheme = (theme: ThemeMode): void => {
		localStorage.setItem('theme', theme)
	}

	const toogleTheme = (theme: ThemeMode): void => {
		dispatch(setTheme(theme))
		const newTheme: ITheme | undefined = themes.find(({ name }) => name === theme)
		if (!newTheme) return
		const rootElement = document.documentElement

		Object.keys(newTheme).forEach(property => {
			if (property === 'name') return

			rootElement.style.setProperty(property, newTheme[property])
		})
	}

	const handleThemeChange = () => {
		const theme: ThemeMode = isChecked ? Themes.light : Themes.dark
		setInputState(!isChecked)
		toogleTheme(theme)
		saveLocalTheme(theme)
	}

	return (
		<div className="theme-switcher">
			<label className={cn('theme-switcher_toggle', { '-checked': isChecked })}>
				<input
					className="theme-switcher_input"
					type="checkbox"
					name="themeSwitcherInput"
					checked={isChecked}
					onChange={handleThemeChange}
				/>
				<div className="theme-switcher_craters">
					<span />
					<span />
					<span />
				</div>
				<div className="theme-switcher_stars">
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
			</label>
		</div>
	)
}
