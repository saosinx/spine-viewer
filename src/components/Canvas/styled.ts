import styled from 'styled-components/macro'

const CanvasContainer = styled.div`
	position: relative;
	height: 100vh;
`

const ColorPicker = styled.div.attrs(({ color }) => ({
	style: {
		backgroundColor: color,
	},
}))`
	border-radius: 0.25rem;
	border: 0.0625rem solid #d9d9d9;
	position: absolute;
	top: 1rem;
	right: 1rem;
	opacity: 0.3;
	cursor: pointer;
	transition: opacity 0.2s ease;

	height: 1.875rem;
	width: 4.375rem;

	&:hover {
		opacity: 1;
	}
`

const InputColor = styled.input<{ onChange: any }>`
	visibility: hidden;
`

const Canvas = styled.canvas`
	background: #f00;
	width: 100%;
	height: 100%;
`

export { CanvasContainer, Canvas, InputColor, ColorPicker }
