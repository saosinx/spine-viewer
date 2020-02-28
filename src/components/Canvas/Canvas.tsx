import React from 'react'
import ColorPicker from '../ColorPicker'
import * as S from './styled'

type CanvasState = {
	isDrawing: boolean
	clientRect: DOMRect | undefined
}

class Canvas extends React.PureComponent<{}, CanvasState> {
	state = { isDrawing: false, clientRect: undefined }

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
		this.state.isDrawing &&
			window.postMessage(
				{
					translation: [
						ev.clientX - (this.state.clientRect! as DOMRect).left,
						ev.clientY - (this.state.clientRect! as DOMRect).top,
					],
				},
				'*'
			)
	}

	handleMouseUp = () => this.state.isDrawing && this.stopTranslation()

	handleMouseLeave = () => this.state.isDrawing && this.stopTranslation()

	handleMouseDown = (ev: React.MouseEvent<HTMLCanvasElement>) =>
		!ev.button && this.startTranslation()

	handleWheel = (ev: React.WheelEvent<HTMLCanvasElement>) =>
		window.postMessage({ zoom: ev.deltaY }, '*')

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
				/>
			</S.CanvasContainer>
		)
	}
}

export default Canvas
