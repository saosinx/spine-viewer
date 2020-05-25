import React from 'react'
import ColorPicker from '../ColorPicker'
import * as S from './styled'

type CanvasState = {
	isDrawing: boolean
	clientRect: DOMRect | undefined
	zoom: number
}

class Canvas extends React.PureComponent<{}, CanvasState> {
	state = {
		isDrawing: false,
		clientRect: undefined,
		translation: [0, 0],
		zoom: 1,
	}

	private canvasRef = React.createRef<HTMLCanvasElement>()

	updateBounds = () => {
		this.setState(state => ({
			...state,
			clientRect: this.canvasRef.current!.getBoundingClientRect(),
		}))
	}

	startTranslation = () => {
		this.setState(state => ({
			...state,
			isDrawing: true,
		}))
	}

	stopTranslation = () => {
		this.setState(state => ({
			...state,
			isDrawing: false,
		}))
	}

	handleMouseMove = (ev: React.MouseEvent<HTMLCanvasElement>) => {
		if (!this.state.isDrawing) return

		const translation = [
			this.state.translation[0] + ev.movementX,
			this.state.translation[1] + ev.movementY,
		]

		this.setState(state => ({
			...state,
			translation,
		}))

		window.postMessage(
			{
				translation,
			},
			'*'
		)
	}

	handleMouseUp = () => this.state.isDrawing && this.stopTranslation()

	handleMouseLeave = () => this.state.isDrawing && this.stopTranslation()

	handleMouseDown = (ev: React.MouseEvent<HTMLCanvasElement>) => {
		!ev.button && this.startTranslation()

		if (ev.button === 2) {
			const translation = [0, 0]
			const zoom = 1

			this.setState(state => ({
				...state,
				translation,
				zoom,
			}))

			window.postMessage({ translation, zoom }, '*')
		}
	}

	handleWheel = (ev: React.WheelEvent<HTMLCanvasElement>) => {
		const k = ev.deltaY < 0 ? 1.1 : 0.9
		const zoom = this.state.zoom * k

		this.setState(state => ({
			...state,
			zoom,
		}))

		window.postMessage({ zoom }, '*')
	}

	handleContextMenu = (ev: React.MouseEvent<HTMLCanvasElement>) => ev.preventDefault()

	handleWindowResize = () => this.updateBounds()

	componentDidMount() {
		this.updateBounds()
		window.addEventListener('resize', this.handleWindowResize)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize)
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
					onContextMenu={this.handleContextMenu}
				/>
			</S.CanvasContainer>
		)
	}
}

export default Canvas
