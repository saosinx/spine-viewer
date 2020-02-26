import React from 'react'
import { connect } from 'react-redux'
import { Tooltip as AntdTooltip } from 'antd'
import { RootState } from '../../../reducers'
import ButtonGroup from '../ButtonGroup'
import * as Types from './types'
import * as S from './styled'

const Tooltip: React.FC<Types.TooltipProps> = props => {
	return (
		<AntdTooltip
			title={props.title}
			overlayStyle={{
				whiteSpace: 'pre-wrap',
			}}
			placement="bottom"
			mouseEnterDelay={0}
		>
			{props.children}
		</AntdTooltip>
	)
}

const PanelHeader: React.FC<Types.PanelHeaderProps> = props => {
	return (
		<S.PanelHeader>
			<span>{props.title}</span>
			{!!props.validationResults && (
				<>
					{!!props.validationResults.unusedImages.length && (
						<Tooltip
							title={`${
								props.validationResults.unusedImages.length
							} unused images:\n${props.validationResults.unusedImages.join('\n')}`}
						>
							<S.Icon type="warning" theme="twoTone" twoToneColor="#ffcc00" />
						</Tooltip>
					)}
					{!!props.validationResults.missedImages.length && (
						<Tooltip
							title={`${
								props.validationResults.missedImages.length
							} missed images:\n${props.validationResults.missedImages.join('\n')}`}
						>
							<S.Icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96" />
						</Tooltip>
					)}
				</>
			)}
		</S.PanelHeader>
	)
}

class Collapse extends React.PureComponent<Types.CollapseProps, {}> {
	render() {
		const { projects, canvasState, validationResults } = this.props

		return (
			<S.Collapse defaultActiveKey={[...projects.keys()]}>
				{projects.map((project: IProject, index: number) => (
					<S.Panel
						key={index.toString()}
						header={
							<PanelHeader
								title={project.base}
								validationResults={validationResults[project.base]}
							/>
						}
					>
						{project.spines.map((spine: ISpine, index: number) => (
							<S.PanelSection key={index.toString()}>
								<S.PanelSectionTitle>{spine.skeletonFile.name}</S.PanelSectionTitle>
								<ButtonGroup
									type="animations"
									objects={spine.animations}
									{...{ project, spine, canvasState }}
								/>
								<ButtonGroup
									type="skins"
									objects={spine.skins}
									{...{ project, spine, canvasState }}
								/>
							</S.PanelSection>
						))}
					</S.Panel>
				))}
			</S.Collapse>
		)
	}
}

function mapStateToProps(state: RootState) {
	return {
		canvasState: {
			...state.canvas,
		},
		validationResults: state.data.validationResults,
	}
}

export default connect(mapStateToProps)(Collapse)
