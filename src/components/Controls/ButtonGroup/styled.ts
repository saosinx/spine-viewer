import styled from 'styled-components/macro'
import { Button as AntButton } from 'antd'

const Button = styled(AntButton)<any>`
	&&& {
		background: transparent;
		border-color: ${props => props.theme.colors.alto};
		color: ${props => props.theme.colors.black65};
		height: 1.5rem;
		padding: 0 0.5rem;
		transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);

		background: ${({ trigger, active, theme }) =>
			active !== 'true'
				? ''
				: trigger === 'animation'
				? theme.colors.dodgerBlue
				: theme.colors.pomegranatea};
		border-color: ${({ trigger, active, theme }) =>
			active !== 'true'
				? ''
				: trigger === 'animation'
				? theme.colors.dodgerBlue
				: theme.colors.pomegranatea};

		&:hover {
			background: ${({ trigger, active, theme }) =>
				active !== 'true'
					? 'transparent'
					: trigger === 'animation'
					? theme.colors.dodgerBlue
					: theme.colors.pomegranatea};
			border-color: ${({ trigger, active, theme }) =>
				active === 'true'
					? theme.colors.alto
					: trigger === 'animation'
					? theme.colors.dodgerBlue
					: theme.colors.pomegranatea};
			color: ${({ trigger, active, theme }) =>
				active === 'true'
					? theme.colors.black65
					: trigger === 'animation'
					? theme.colors.dodgerBlue
					: theme.colors.pomegranatea};
		}

		&:hover + & {
			border-left-color: ${({ trigger, theme }) =>
				trigger === 'animation' ? theme.colors.dodgerBlue : theme.colors.pomegranatea};
		}

		&:hover,
		&:active,
		&:focus {
			text-decoration: none;
			outline: 0;
		}
	}
`

const ButtonGroup = styled(AntButton.Group)<any>`
	&&& {
		transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);

		${Button} {
			border-radius: 0;
			margin-left: -0.0625rem;
			margin-top: -0.0625rem;
		}

		& + & {
			margin-left: 0;
		}
	}
`

export { Button, ButtonGroup }
