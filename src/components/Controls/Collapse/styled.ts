import styled from 'styled-components/macro'
import { ButtonProps } from './Collapse'
import { Button as AntButton, Collapse as AntCollapse, Icon as AntIcon } from 'antd'

const Button = styled(AntButton)<ButtonProps & { active: string; onClick: any } & any>`
	height: 1.5rem;
	padding: 0 0.5rem;
	transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);

	&:focus {
		background: ${props =>
			props.group === 'animations' ? '#40a9ff !important' : '#ee3737 !important'};
		border-color: ${props =>
			props.group === 'animations' ? '#40a9ff !important' : '#ee3737 !important'};
		color: #fff !important;
	}
`

const ButtonGroup = styled(AntButton.Group)`
	${Button} {
		border-radius: 0 !important;
		margin-left: -0.0625rem !important;
		margin-top: -0.0625rem;
	}

	& + & {
		margin-left: 0 !important;
	}
`

const Panel = styled(AntCollapse.Panel)`
	> .ant-collapse-header {
		padding: 0.5rem 1rem !important;
		padding-left: 2.5rem !important;
		font-weight: bold;
	}

	.ant-collapse-content-box {
		padding: 0.3125rem 0.625rem !important;
	}
`

const Collapse = styled(AntCollapse)``

const PanelSectionTitle = styled.div``
const PanelSection = styled.div`
	${PanelSectionTitle} {
		margin-bottom: 0.0625rem;
	}

	& + & {
		margin-top: 0.3125rem;
	}
`

const PanelHeader = styled.div`
	display: flex;
	align-items: center;
`

const Icon = styled(AntIcon)`
	&&& {
		font-size: 20px;
		margin-left: 0.625rem;
	}
`

export { Button, ButtonGroup, Collapse, Icon, Panel, PanelHeader, PanelSection, PanelSectionTitle }
