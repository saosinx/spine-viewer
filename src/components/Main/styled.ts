import styled from 'styled-components/macro'

const Main = styled.main`
	background: #fff;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto;
	min-height: 100vh;
	min-width: fit-content;
	transition: background 250ms ease-out, border-color 250ms ease-out, color 250ms ease-out;
`

export { Main }
