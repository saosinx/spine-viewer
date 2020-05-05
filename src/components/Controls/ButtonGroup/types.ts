import { IState as ICanvasState } from './reducer'

export type ButtonProps = {
	active?: boolean
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
