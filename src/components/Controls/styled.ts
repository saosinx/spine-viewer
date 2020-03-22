import styled from 'styled-components/macro'

const Controls = styled.div`
	padding: 0.3125rem;
	height: 100vh;
	overflow-y: auto;
	border-right: 1px solid ${props => props.theme.colors.alto};
	user-select: none;

	> * + * {
		margin-top: 0.625rem;
	}
`

export { Controls }
