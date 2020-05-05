import React from 'react'
import { Tooltip as AntdTooltip } from 'antd'

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

const PanelHeader: React.FC<Types.PanelHeaderProps> = ({ title, results }) => {
	return (
		<S.PanelHeader>
			<span>{title}</span>
			{!!results && (
				<>
					{!!results.images.unused.length && (
						<Tooltip
							title={`${results.images.unused.length} unused images (${
								results.images.size
							}):\n${results.images.unused.join('\n')}`}
						>
							<S.Icon type="warning" theme="twoTone" twoToneColor="#ffcc00" />
						</Tooltip>
					)}
					{!!results.images.missed.length && (
						<Tooltip
							title={`${results.images.missed.length} missed images:\n${results.images.missed.join(
								'\n'
							)}`}
						>
							<S.Icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96" />
						</Tooltip>
					)}
				</>
			)}
		</S.PanelHeader>
	)
}

export default class Collapse extends React.PureComponent<Types.CollapseProps, {}> {
	render() {
		const { projects, canvasState, results } = this.props

		return (
			<S.Collapse defaultActiveKey={[...projects.keys()]}>
				{projects.map((project: IProject, index: number) => (
					<S.Panel
						key={index.toString()}
						header={<PanelHeader title={project.base} results={results[project.base]} />}
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
