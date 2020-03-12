import { IState as ICanvasState } from '../../../reducers/canvas.reducer'

export type PanelHeaderProps = {
	title: string
	validation: Ivalidation
}

export type CollapseProps = {
	projects: IProject[]
	validation: IValidation | any
	canvasState: ICanvasState
}

export type TooltipProps = {
	title: string
}
