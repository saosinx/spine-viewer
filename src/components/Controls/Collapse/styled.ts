import styled from 'styled-components/macro'
import { Collapse as AntCollapse, Icon as AntIcon } from 'antd'

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

export { Collapse, Icon, Panel, PanelHeader, PanelSection, PanelSectionTitle }
