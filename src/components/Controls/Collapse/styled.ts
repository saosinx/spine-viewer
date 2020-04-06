import styled from 'styled-components/macro'
import { Collapse as AntCollapse, Icon as AntIcon } from 'antd'

const Panel = styled(AntCollapse.Panel)`
	&&& {
		transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);

		> .ant-collapse-header {
			background: ${({ theme }) => theme.colors.alabaster};
			color: ${({ theme }) => theme.colors.black85};
			padding: 0.5rem 1rem;
			padding-left: 2.5rem;
			font-weight: bold;
		}

		.ant-collapse-content {
			background: ${({ theme }) => theme.colors.snowy};
			border-color: ${({ theme }) => theme.colors.alto};
		}

		.ant-collapse-content-box {
			padding: 0.3125rem 0.625rem;
		}

		.ant-collapse-arrow {
			color: ${({ theme }) => theme.colors.black85};
		}

		.ant-collapse-item {
			border-color: ${({ theme }) => theme.colors.alto};
		}
	}
`

const Collapse = styled(AntCollapse)`
	&&& {
		background: ${({ theme }) => theme.colors.alabaster};
		border-color: ${({ theme }) => theme.colors.alto};

		.ant-collapse-item {
			border-color: ${({ theme }) => theme.colors.alto};
		}
	}
`

const PanelSectionTitle = styled.div`
	color: ${({ theme }) => theme.colors.black65};
`

const PanelSection = styled.div`
	${PanelSectionTitle} {
		margin-bottom: 0.0625rem;
	}

	& + & {
		margin-top: 0.3125rem;
	}

	border-color: ${({ theme }) => theme.colors.alto} !important;
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

export { Collapse, Icon, Panel, PanelHeader, PanelSection, PanelSectionTitle }
