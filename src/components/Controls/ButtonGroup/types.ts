import { IState as ICanvasState } from '../../../reducers/canvas.reducer'

export type ButtonProps = {
	animation: string | undefined
	skin: string | undefined
	handleControlSet(args: any): void
}

export type ButtonGroupProps = {
	canvasState: ICanvasState
	objects: string[]
	project: IProject
	spine: ISpine
	type: 'skins' | 'animations'
}
