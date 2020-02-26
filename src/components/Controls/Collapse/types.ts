import { IState as ICanvasState } from '../../../reducers/canvas.reducer'

export type PanelHeaderProps = {
	title: string
	validationResults: IValidationResults
}

export type CollapseProps = {
	projects: IProject[]
	validationResults: IValidation | any
	canvasState: ICanvasState
}

export type TooltipProps = {
	title: string
}
