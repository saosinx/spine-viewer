import styled from 'styled-components/macro'

const Controls = styled.div`
	padding: 0.3125rem;
	height: 100vh;
	overflow-y: scroll;

	> * + * {
		margin-top: 0.625rem;
	}
`

export { Controls }