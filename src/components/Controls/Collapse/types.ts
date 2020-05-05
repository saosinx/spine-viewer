import { IState as ICanvasState } from '../ButtonGroup/reducer'

export type PanelHeaderProps = {
	title: string
	results: Ivalidation
}

export type CollapseProps = {
	projects: IProject[]
	results: IValidation | any
	canvasState: ICanvasState
}

export type TooltipProps = {
	title: string
}
