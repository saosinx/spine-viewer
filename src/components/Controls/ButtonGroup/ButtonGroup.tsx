import React from 'react'
import { dispatch } from '../../../store'
import { setAnimationAsync, IState as ICanvasState } from '../../../reducers/canvas.reducer'
import * as Types from './types'
import * as S from './styled'

const Button: React.FC<Types.ButtonProps> = props => {
	const trigger = props.animation ? 'animation' : 'skin'
	const active = props.active ? true : false

	const handleClick = () => {
		props.handleControlSet({
			animation: props.animation,
			skin: props.skin,
		})
	}

	return (
		<S.Button active={active.toString()} trigger={trigger} onClick={handleClick}>
			{props.animation || props.skin}
		</S.Button>
	)
}

const ButtonGroup: React.FC<Types.ButtonGroupProps> = ({ canvasState, spine, ...props }) => {
	const handleControlSet = ({ animation, skin }: any): void => {
		const opts = {
			projectName: props.project.base,
			spineName: spine.skeletonFile.name,
			animation: animation || canvasState.animation || spine.animations[0],
			skin: skin || canvasState.skin || spine.skins[0],
		}

		if (spine.skeletonFile.name !== canvasState.spineName) {
			opts.animation = animation || spine.animations[0]
			opts.skin = skin || spine.skins[0]
		}

		dispatch(setAnimationAsync(opts)).then((opts: ICanvasState) => {
			window.postMessage(
				{
					projectName: opts.projectName,
					spineName: opts.spineName,
					animation: opts.animation,
					skin: opts.skin,
				},
				'*'
			)
		})
	}

	return (
		<S.ButtonGroup>
			{props.objects.map((object, index) => (
				<Button
					key={index.toString()}
					active={
						canvasState.spineName === spine.skeletonFile.name &&
						(canvasState.animation === object || canvasState.skin === object)
					}
					animation={props.type === 'animations' ? object : undefined}
					skin={props.type === 'skins' ? object : undefined}
					handleControlSet={handleControlSet}
				/>
			))}
		</S.ButtonGroup>
	)
}

export default ButtonGroup
