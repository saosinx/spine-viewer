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

const PanelHeader: React.FC<Types.PanelHeaderProps> = ({ title, validation }) => {
	return (
		<S.PanelHeader>
			<span>{title}</span>
			{!!validation && (
				<>
					{!!validation.images.unused.length && (
						<Tooltip
							title={`${validation.images.unused.length} unused images (${
								validation.images.size
							}):\n${validation.images.unused.join('\n')}`}
						>
							<S.Icon type="warning" theme="twoTone" twoToneColor="#ffcc00" />
						</Tooltip>
					)}
					{!!validation.images.missed.length && (
						<Tooltip
							title={`${
								validation.images.missed.length
							} missed images:\n${validation.images.missed.join('\n')}`}
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
		const { projects, canvasState, validation } = this.props

		return (
			<S.Collapse defaultActiveKey={[...projects.keys()]}>
				{projects.map((project: IProject, index: number) => (
					<S.Panel
						key={index.toString()}
						header={<PanelHeader title={project.base} validation={validation[project.base]} />}
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

const mapStateToProps = (state: RootState) => ({
	canvasState: {
		...state.canvas,
	},
	validation: state.data.validation,
})

export default connect(mapStateToProps)(Collapse)
