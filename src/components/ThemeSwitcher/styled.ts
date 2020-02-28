import styled from 'styled-components/macro'

const ThemeSwitcher = styled.div`
	position: fixed;
	bottom: 1.5625rem;
	right: 1.5625rem;
	opacity: 0.3;
	transition: opacity 200ms linear;
	z-index: 10;

	&:hover {
		opacity: 1;
	}
`

const ToggleSwitch = styled.label<{ checked?: boolean }>`
	background-color: ${props =>
		props.checked ? props.theme.colors.sanMarino : props.theme.colors.anakiwa};
	border-radius: 5.25rem;
	cursor: pointer;
	display: inline-block;
	height: 3.125rem;
	position: relative;
	transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
	width: 5.625rem;
`

const ToggleKnob = styled.span`
	background-color: ${props => props.theme.colors.peachOrange};
	border-radius: 50%;
	box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.3);
	display: inline-block;
	position: relative;
	top: 0.1875rem;
	left: 0.1875rem;
	transform: rotate(-45deg);
	transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
	height: 2.75rem;
	width: 2.75rem;
	z-index: 1;
`

const Crater = styled.span`
	background-color: ${props => props.theme.colors.cashmere};
	border-radius: 100%;
	opacity: 0;
	position: absolute;
	transition: opacity 200ms ease-in-out;

	&:nth-child(1) {
		top: 1.125rem;
		left: 0.625rem;
		height: 0.25rem;
		width: 0.25rem;
	}

	&:nth-child(2) {
		top: 1.75rem;
		left: 1.375rem;
		height: 0.375rem;
		width: 0.375rem;
	}

	&:nth-child(3) {
		top: 0.625rem;
		left: 1.5625rem;
		height: 0.5rem;
		width: 0.5rem;
	}
`

const Star = styled.span`
	background-color: ${props => props.theme.colors.white};
	border-radius: 50%;
	position: absolute;
	transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

	&:nth-child(1) {
		top: 0.625rem;
		left: 2.1875rem;
		height: 0.1875rem;
		width: 1.875rem;
		z-index: 0;
	}

	&:nth-child(2) {
		top: 1.125rem;
		left: 1.75rem;
		height: 0.1875rem;
		width: 1.875rem;
		z-index: 1;
	}

	&:nth-child(3) {
		top: 1.6875rem;
		left: 2.5rem;
		height: 0.1875rem;
		width: 1.875rem;
		z-index: 0;
	}

	&:nth-child(4),
	&:nth-child(5),
	&:nth-child(6) {
		opacity: 0;
		transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
	}

	&:nth-child(4) {
		top: 1rem;
		left: 0.6875rem;
		transform: translate(0.1875rem, 0);
		height: 0.125rem;
		width: 0.125rem;
		z-index: 0;
	}

	&:nth-child(5) {
		top: 2rem;
		left: 1.0625rem;
		transform: translate(0.1875rem, 0);
		height: 0.1875rem;
		width: 0.1875rem;
		z-index: 0;
	}

	&:nth-child(6) {
		top: 2.25rem;
		left: 1.75rem;
		height: 0.125rem;
		transform: translate(0.1875rem, 0);
		width: 0.125rem;
		z-index: 0;
	}
`
/* prettier-ignore */
const ThemeSwitcherInput = styled.input`
	display: none;

	&:checked {
		+ ${ToggleKnob} {
			background-color: ${props => props.theme.colors.peach};
			transform: translate(2.5rem, 0) rotate(0);

			${Crater} {
				opacity: 1;
			}
		}

		~ div {
			${Star}:nth-child(1) {
				height: 0.125rem;
				width: 0.125rem;
			}

			${Star}:nth-child(2) {
				transform: translate(-0.3125rem, 0);
				height: 0.25rem;
				width: 0.25rem;
			}

			${Star}:nth-child(3) {
				transform: translate(-0.4375rem, 0);
				height: 0.125rem;
				width: 0.125rem;
			}

			${Star} {
				&:nth-child(4),
				&:nth-child(5),
				&:nth-child(6) {
					opacity: 1;
					transform: translate(0, 0);
					transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
				}
			}

			${Star}:nth-child(4) {
				transition-delay: 200ms;
			}

			${Star}:nth-child(5) {
				transition-delay: 300ms;
			}

			${Star}:nth-child(6) {
				transition-delay: 400ms;
			}
		}
	}
`

export { ThemeSwitcher, ThemeSwitcherInput, ToggleSwitch, ToggleKnob, Crater, Star }
