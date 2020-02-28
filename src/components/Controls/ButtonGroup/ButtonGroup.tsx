import React from 'react'
import { dispatch } from '../../../store'
import { setAnimationAsync, IState as ICanvasState } from '../../../reducers/canvas.reducer'
import * as Types from './types'
import * as S from './styled'

const Button: React.FC<Types.ButtonProps> = props => {
	const type = props.animation ? 'animation' : 'skin'
	const active = props.active ? true : false

	const handleClick = () => {
		props.handleControlSet({
			animation: props.animation,
			skin: props.skin,
		})
	}

	return (
		<S.Button active={active.toString()} type={type} onClick={handleClick}>
			{props.animation || props.skin}
		</S.Button>
	)
}

const ButtonGroup: React.FC<Types.ButtonGroupProps> = props => {
	const handleControlSet = ({ animation, skin }: any): void => {
		const opts = {
			projectName: props.project.base,
			spineName: props.spine.skeletonFile.name,
			animation: animation || props.canvasState.animation || props.spine.animations[0],
			skin: skin || props.canvasState.skin || props.spine.skins[0],
		}

		if (props.spine.skeletonFile.name !== props.canvasState.spineName) {
			opts.animation = animation || props.spine.animations[0]
			opts.skin = skin || props.spine.skins[0]
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
					active={props.canvasState.animation === object || props.canvasState.skin === object}
					animation={props.type === 'animations' ? object : undefined}
					skin={props.type === 'skins' ? object : undefined}
					handleControlSet={handleControlSet}
				/>
			))}
		</S.ButtonGroup>
	)
}

export default ButtonGroup
