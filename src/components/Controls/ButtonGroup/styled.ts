import styled from 'styled-components/macro'
import { Button as AntButton } from 'antd'

const Button = styled(AntButton)<any>`
	background: transparent;
	border-color: ${props => props.theme.colors.alto};
	color: ${props => props.theme.colors.black65};
	height: 1.5rem;
	padding: 0 0.5rem;
	transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);

	&:focus {
		background: ${props =>
			props.type === 'animation' ? props.theme.colors.dodgerBlue : '#ee3737'};
		border-color: ${props =>
			props.type === 'animation' ? props.theme.colors.dodgerBlue : '#ee3737'};
	}

	&,
	&:active,
	&:focus {
		outline: 0;
	}

	&:hover,
	&:focus {
		color: ${props =>
			props.type === 'animation' ? props.theme.colors.dodgerBlue : '#ee3737'};
		border-color: ${props =>
			props.type === 'animation' ? props.theme.colors.dodgerBlue : '#ee3737'};
	}

	&:active {
		color: ${props =>
			props.type === 'animation' ? props.theme.colors.scienceBlue : '#ee3737'};
		border-color: ${props =>
			props.type === 'animation' ? props.theme.colors.scienceBlue : '#ee3737'};
	}

	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
		background-color: transparent;
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
