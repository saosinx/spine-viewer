import React, { useState } from 'react'
import cn from 'classnames'

import { dispatch } from '../../store'
import { setTheme } from './reducer'

import './styles.scss'

type ThemeMode = 'light' | 'dark'

type Props = {
	theme: ThemeMode
}

export const ThemeSwitcher = ({ theme }: Props) => {
	const [isChecked, setInputState] = useState(theme === 'light' ? false : true)

	const saveLocalTheme = (theme: ThemeMode): void => {
		localStorage.setItem('theme', theme)
	}

	const toogleTheme = (theme: ThemeMode): void => {
		dispatch(setTheme(theme))
	}

	const handleThemeChange = () => {
		const theme: ThemeMode = isChecked ? 'light' : 'dark'
		setInputState(!isChecked)
		toogleTheme(theme)
		saveLocalTheme(theme)
	}

	return (
		<div className="theme-switcher">
			<label className={cn('toggle-switch', { '-checked': isChecked })}>
				<input
					className="theme-switcher-input"
					type="checkbox"
					name="themeSwitcherInput"
					checked={isChecked}
					onChange={handleThemeChange}
				/>
				<div className="toggle-knob">
					<span />
					<span />
					<span />
				</div>
				<div className="stars">
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
