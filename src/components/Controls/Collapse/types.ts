import { IState as IProjectState } from '../ButtonGroup/reducer'

export type PanelHeaderProps = {
	title: string
	results: Ivalidation
}

export type CollapseProps = {
	projects: Array<IProject>
	results: IValidation | any
	activeProject: IProjectState
}

export type PanelProps = {
	project: IProject
	results: IValidation | any
	activeProject: IProjectState
	key: string
}

export type PanelSectionProps = {
	project: IProject
	spine: ISpine
	activeProject: IProjectState
	key: string
}

export type TooltipProps = {
	title: string
}
