import styled from 'styled-components/macro'

const Icon = styled.i``
const ButtonContainer = styled.div`
	input[type='file'] {
		display: none;
	}
`

const Button = styled.button`
	line-height: 1.499;
	position: relative;
	display: inline-block;
	font-weight: 400;
	white-space: nowrap;
	text-align: center;
	border: 0.0625rem solid transparent;
	box-shadow: 0 0.125rem 0 rgba(0, 0, 0, 0.015);
	cursor: pointer;
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	user-select: none;
	touch-action: manipulation;
	height: 2rem;
	padding: 0 0.9375rem;
	font-size: 0.875rem;
	border-radius: 0.25rem;
	color: rgba(0, 0, 0, 0.65);
	background-color: #fff;
	border-color: #d9d9d9;

	& > ${Icon} + span,
	& > span + ${Icon} {
		margin-left: 0.5rem;
	}

	&,
	&:active,
	&:focus {
		outline: 0;
	}

	&:hover,
	&:focus {
		color: #40a9ff;
		border-color: #40a9ff;
	}

	&:active {
		color: #096dd9;
		border-color: #096dd9;
	}

	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
		background-color: #fff;
	}
`

const InputLog = styled.span``

const Input = styled.div`
	display: flex;
	align-items: center;

	${InputLog} {
		margin-left: 0.5rem;
		font-size: 0.875em;
	}
`

export { Input, InputLog, Button, ButtonContainer, Icon }
