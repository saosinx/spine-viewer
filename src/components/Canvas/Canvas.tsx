import React, { useState } from 'react'
import ColorPicker from '../ColorPicker'
import './styles.scss'

export const Canvas = () => {
	const [zoom, setZoom] = useState(1)
	const [translation, setTranslation] = useState([0, 0])
	const [isDrawing, setDrawingState] = useState(false)

	const startTranslation = (): void => setDrawingState(true)
	const stopTranslation = (): void => setDrawingState(false)

	const handleMouseUp = (): void | false => isDrawing && stopTranslation()
	const handleMouseLeave = (): void | false => isDrawing && stopTranslation()

	const handleMouseMove = (ev: React.MouseEvent<HTMLCanvasElement>): void => {
		if (!isDrawing) return

		const newTranslation = [translation[0] + ev.movementX, translation[1] + ev.movementY]

		setTranslation(newTranslation)

		window.postMessage({ translation: newTranslation }, '*')
	}

	const handleMouseDown = (ev: React.MouseEvent<HTMLCanvasElement>): void => {
		!ev.button && startTranslation()

		if (ev.button === 2) {
			const translation: Array<number> = [0, 0]
			const newZoom = 1

			setTranslation(translation)
			setZoom(newZoom)

			window.postMessage({ translation, zoom: newZoom }, '*')
		}
	}

	const handleWheel = (ev: React.WheelEvent<HTMLCanvasElement>): void => {
		const k = ev.deltaY < 0 ? 1.1 : 0.9
		const newZoom = zoom * k

		setZoom(newZoom)

		window.postMessage({ zoom: newZoom }, '*')
	}

	const handleContextMenu = (ev: React.MouseEvent<HTMLCanvasElement>): void => ev.preventDefault()

	return (
		<div className="canvas-container">
			<ColorPicker />
			<canvas
				id="canvas"
				className="canvas"
				onWheel={handleWheel}
				onMouseUp={handleMouseUp}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onContextMenu={handleContextMenu}
			/>
		</div>
	)
}
