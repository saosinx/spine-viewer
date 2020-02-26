import React from 'react'

import * as S from './styled'

class ColorPicker extends React.Component<{}, { color: string }> {
	private inputColorRef = React.createRef<HTMLInputElement>()
	
	constructor(props: any) {
		super(props)

		this.state = {
			color: '#000000',
		}

		this.handleColorChange = this.handleColorChange.bind(this)
	}


	handleColorChange(ev: React.SyntheticEvent) {
		ev.persist()
		this.setState(() => ({
			color: (ev.target as HTMLInputElement).value,
		}), () => window.postMessage({ backgroundColor: this.state.color }, '*'))
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

class Canvas extends React.Component<{}, {}> {
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
