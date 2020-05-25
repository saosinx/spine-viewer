import React from 'react'
import { connect } from 'react-redux'

import { RootState, dispatch } from '../../store'
import { setTheme } from './reducer'

import * as S from './styled'

class ThemeSwitcher extends React.Component<{ theme: string }, { isChecked: boolean }> {
	constructor(props: any) {
		super(props)

		this.state = { isChecked: this.props.theme === 'light' ? false : true }
		this.handleThemeChange = this.handleThemeChange.bind(this)
	}

	private saveLocalTheme(theme: string): void {
		localStorage.setItem('theme', theme)
	}

	private toogleTheme(theme: string): void {
		dispatch(setTheme(theme))
	}

	private handleThemeChange() {
		const theme = this.state.isChecked ? 'light' : 'dark'
		this.setState({ isChecked: !this.state.isChecked })
		this.toogleTheme(theme)
		this.saveLocalTheme(theme)
	}

	public render() {
		return (
			<S.ThemeSwitcher>
				<S.ToggleSwitch checked={this.state.isChecked}>
					<S.ThemeSwitcherInput
						type="checkbox"
						name="themeSwitcherInput"
						checked={this.state.isChecked}
						onChange={this.handleThemeChange}
					/>
					<S.ToggleKnob>
						<S.Crater />
						<S.Crater />
						<S.Crater />
					</S.ToggleKnob>
					<div>
						<S.Star />
						<S.Star />
						<S.Star />
						<S.Star />
						<S.Star />
						<S.Star />
					</div>
				</S.ToggleSwitch>
			</S.ThemeSwitcher>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	theme: state.theme.value,
})

export default connect(mapStateToProps)(ThemeSwitcher)
