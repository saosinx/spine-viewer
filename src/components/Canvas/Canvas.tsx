import React from 'react'

import * as S from './styled'

class ColorPicker extends React.PureComponent<{}, { color: string }> {
	constructor(props: any) {
		super(props)

		this.state = {
			color: '#000000',
		}

		this.handleColorChange = this.handleColorChange.bind(this)
	}

	private inputColorRef = React.createRef<HTMLInputElement>()

	handleColorChange(ev: MouseEvent) {
		this.setState(() => ({
			color: (ev.target as HTMLInputElement).value,
		}))

		window.postMessage({ backgroundColor: this.state.color }, '*')
	}

	render() {
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

class Canvas extends React.PureComponent<{}, {}> {
	private canvasRef = React.createRef<HTMLCanvasElement>()

	render() {
		return (
			<S.CanvasContainer className="block canvas-container">
				<ColorPicker />
				<S.Canvas id="canvas" ref={this.canvasRef} />
			</S.CanvasContainer>
		)
	}
}

export default Canvas
