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
		this.setState(
			() => ({
				color: (ev.target as HTMLInputElement).value,
			}),
			() => window.postMessage({ backgroundColor: this.state.color }, '*')
		)
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

class Canvas extends React.Component<{}, { isDrawing: boolean }> {
	state = { isDrawing: false }

	private canvasRef = React.createRef<HTMLCanvasElement>()

	startTranslation = (): void => {
		this.setState(() => ({
			isDrawing: true,
		}))
	}

	stopTranslation = (): void => {
		this.setState(() => ({
			isDrawing: false,
		}))
	}

	handleMouseMove = (ev: React.MouseEvent<HTMLCanvasElement>): void => {
		this.state.isDrawing && window.postMessage({ translation: [ev.movementX, ev.movementY] }, '*')
	}

	handleMouseDown = (ev: React.MouseEvent<HTMLCanvasElement>): void => {
		!ev.button && this.startTranslation()
	}

	handleMouseUp = (ev: React.MouseEvent<HTMLCanvasElement>): void => {
		this.state.isDrawing && this.stopTranslation()
	}

	handleMouseLeave = (ev: React.MouseEvent<HTMLCanvasElement>): void => {
		this.state.isDrawing && this.stopTranslation()
	}

	handleWheel = (ev: React.WheelEvent<HTMLCanvasElement>): void => {
		window.postMessage({ zoom: ev.deltaY }, '*')
	}

	render() {
		return (
			<S.CanvasContainer className="block canvas-container">
				<ColorPicker />
				<S.Canvas
					id="canvas"
					ref={this.canvasRef}
					onWheel={this.handleWheel}
					onMouseUp={this.handleMouseUp}
					onMouseDown={this.handleMouseDown}
					onMouseMove={this.handleMouseMove}
					onMouseLeave={this.handleMouseLeave}
				/>
			</S.CanvasContainer>
		)
	}
}

export default Canvas
