import React from 'react'
import { Tooltip as AntTooltip, Collapse as AntCollapse, Icon as AntIcon } from 'antd'

import ButtonGroup from '../ButtonGroup'
import * as T from './types'
import './styles.scss'

const Tooltip = ({ title, children }: T.TooltipProps) => (
	<AntTooltip
		title={title}
		overlayStyle={{
			whiteSpace: 'pre-wrap',
		}}
		placement="bottom"
		mouseEnterDelay={0}
	>
		{children}
	</AntTooltip>
)

const PanelHeader = ({ title, results }: T.PanelHeaderProps) => {
	const images = results ? results.images : null

	return (
		<div className="collapse_panel_header">
			<span>{title}</span>
			{Boolean(images) && (
				<>
					{Boolean(images!.unused.length) && (
						<Tooltip
							title={`${images!.unused.length} unused images (${
								images!.size
							}):\n${images!.unused.join('\n')}`}
						>
							<AntIcon className="ant-icon" type="warning" theme="twoTone" twoToneColor="#ffcc00" />
						</Tooltip>
					)}
					{Boolean(images!.missed.length) && (
						<Tooltip
							title={`${images!.missed.length} missed images:\n${images!.missed.join('\n')}`}
						>
							<AntIcon
								className="ant-icon"
								type="exclamation-circle"
								theme="twoTone"
								twoToneColor="#eb2f96"
							/>
						</Tooltip>
					)}
				</>
			)}
		</div>
	)
}

const PanelSection = ({ spine, project, activeProject }: T.PanelSectionProps) => (
	<div className="collapse_panel_section">
		<div className="collapse_panel_section_title">{spine.skeletonFile.name}</div>
		<ButtonGroup
			type="animations"
			objects={spine.animations}
			{...{ project, spine, activeProject }}
		/>
		<ButtonGroup type="skins" objects={spine.skins} {...{ project, spine, activeProject }} />
	</div>
)

const Panel = ({ project, activeProject, results, ...props }: T.PanelProps) => (
	<AntCollapse.Panel
		{...props}
		header={<PanelHeader title={project.base} results={results[project.base]} />}
	>
		{project.spines.map((spine: ISpine, i: number) => (
			<PanelSection {...{ spine, project, activeProject }} key={i.toString()} />
		))}
	</AntCollapse.Panel>
)

export const Collapse = ({ projects, ...props }: T.CollapseProps) => (
	<div className="ant-collapse-wrapper">
		<AntCollapse defaultActiveKey={[...projects.keys()]}>
			{projects.map((project: IProject, i: number) => (
				<Panel project={project} key={i.toString()} {...props} />
			))}
		</AntCollapse>
	</div>
)
