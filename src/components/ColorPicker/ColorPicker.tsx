import React, { useState, useRef, useEffect } from 'react'

import './styles.scss'

export const ColorPicker = () => {
	const inputColorRef = useRef<HTMLInputElement>(null)

	const [color, setColor] = useState('#000000')

	const handleColorChange = (ev: React.SyntheticEvent) => {
		ev.persist()

		setColor((ev.target as HTMLInputElement).value)
	}

	useEffect(() => {
		window.postMessage({ backgroundColor: color }, '*')
	}, [color])

	return (
		<div
			className="color-picker"
			onClick={() => inputColorRef.current!.click()}
			style={{
				backgroundColor: color,
			}}
		>
			<input
				className="input-color"
				type="color"
				value={color}
				ref={inputColorRef}
				onChange={handleColorChange}
			/>
		</div>
	)
}
