import React from 'react'
import * as S from './styled'

export default class ColorPicker extends React.PureComponent<{}, { color: string }> {
	private inputColorRef = React.createRef<HTMLInputElement>()

	constructor(props: any) {
		super(props)

		this.state = {
			color: '#000000',
		}

		this.handleColorChange = this.handleColorChange.bind(this)
	}

	private handleColorChange(ev: React.SyntheticEvent) {
		ev.persist()
		this.setState(
			() => ({
				color: (ev.target as HTMLInputElement).value,
			}),
			() => window.postMessage({ backgroundColor: this.state.color }, '*')
		)
	}

	public render() {
		return (
			<S.ColorPicker onClick={() => this.inputColorRef.current!.click()} color={this.state.color}>
				<S.InputColor
					type="color"
					value={this.state.color}
					ref={this.inputColorRef}
					onChange={this.handleColorChange}
				/>
			</S.ColorPicker>
		)
	}
}
