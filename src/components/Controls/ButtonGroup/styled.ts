import styled from 'styled-components/macro'
import { Button as AntButton } from 'antd'

const Button = styled(AntButton)<any>`
	height: 1.5rem;
	padding: 0 0.5rem;
	transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);

	&:focus {
		background: ${props =>
			props.type === 'animation' ? '#40a9ff !important' : '#ee3737 !important'};
		border-color: ${props =>
			props.type === 'animation' ? '#40a9ff !important' : '#ee3737 !important'};
		color: #fff !important;
	}
`

const ButtonGroup = styled(AntButton.Group)<any>`
	${Button} {
		border-radius: 0 !important;
		margin-left: -0.0625rem !important;
		margin-top: -0.0625rem;
	}

	& + & {
		margin-left: 0 !important;
	}
`

export { Button, ButtonGroup }
