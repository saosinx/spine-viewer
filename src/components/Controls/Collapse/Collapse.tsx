import React from 'react'
import { Tooltip as AntTooltip } from 'antd'

import ButtonGroup from '../ButtonGroup'
import * as Types from './types'
import * as S from './styled'

const Tooltip: React.FC<Types.TooltipProps> = props => (
	<AntTooltip
		title={props.title}
		overlayStyle={{
			whiteSpace: 'pre-wrap',
		}}
		placement="bottom"
		mouseEnterDelay={0}
	>
		{props.children}
	</AntTooltip>
)

const PanelHeader: React.FC<Types.PanelHeaderProps> = ({ title, results }) => (
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

const PanelSection: React.FC<Types.PanelSectionProps> = ({ spine, project, activeProject }) => (
	<S.PanelSection>
		<S.PanelSectionTitle>{spine.skeletonFile.name}</S.PanelSectionTitle>
		<ButtonGroup
			type="animations"
			objects={spine.animations}
			{...{ project, spine, activeProject }}
		/>
		<ButtonGroup type="skins" objects={spine.skins} {...{ project, spine, activeProject }} />
	</S.PanelSection>
)

const Panel: React.FC<Types.PanelProps> = ({ project, activeProject, results, ...props }) => (
	<S.Panel {...props} header={<PanelHeader title={project.base} results={results[project.base]} />}>
		{project.spines.map((spine: ISpine, i: number) => (
			<PanelSection {...{ spine, project, activeProject }} key={i.toString()} />
		))}
	</S.Panel>
)

export default class Collapse extends React.PureComponent<Types.CollapseProps, {}> {
	public render() {
		const { projects, ...props } = this.props

		return (
			<S.Collapse defaultActiveKey={[...projects.keys()]}>
				{projects.map((project: IProject, i: number) => (
					<Panel project={project} key={i.toString()} {...props} />
				))}
			</S.Collapse>
		)
	}
}
