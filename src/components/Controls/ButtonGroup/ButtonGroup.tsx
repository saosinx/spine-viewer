import React from 'react'
import { Button as AntButton } from 'antd'
import cn from 'classnames'

import { dispatch } from '../../../store'
import { setAnimationAsync, IState as ICanvasState } from './reducer'

import './styles.scss'

type ButtonProps = {
	active?: boolean
	animation: string | undefined
	skin: string | undefined
	handleControlSet(args: any): void
}

const Button = ({ animation, active = false, skin, handleControlSet }: ButtonProps) => {
	const trigger = animation ? 'animation' : 'skin'

	const handleClick = () => {
		handleControlSet({
			animation,
			skin,
		})
	}

	return (
		<AntButton
			className={cn('btn', { [`-${trigger}`]: trigger }, { [`-active`]: active })}
			onClick={handleClick}
		>
			{animation || skin}
		</AntButton>
	)
}

type ButtonGroupProps = {
	activeProject: ICanvasState
	objects: Array<string>
	project: IProject
	spine: ISpine
	type: 'skins' | 'animations'
}

export const ButtonGroup = ({ project, activeProject, spine, objects, type }: ButtonGroupProps) => {
	const handleControlSet = ({ animation, skin }: any): void => {
		const opts = {
			projectName: project.base,
			spineName: spine.skeletonFile.name,
			animation: animation || activeProject.animation || spine.animations[0],
			skin: skin || activeProject.skin || spine.skins[0],
		}

		if (spine.skeletonFile.name !== activeProject.spineName) {
			opts.animation = animation || spine.animations[0]
			opts.skin = skin || spine.skins[0]
		}

		dispatch(setAnimationAsync(opts))
	}

	return (
		<div className="btn-group">
			{objects.map((object, index) => (
				<Button
					key={index.toString()}
					active={
						activeProject.spineName === spine.skeletonFile.name &&
						(activeProject.animation === object || activeProject.skin === object)
					}
					animation={type === 'animations' ? object : undefined}
					skin={type === 'skins' ? object : undefined}
					handleControlSet={handleControlSet}
				/>
			))}
		</div>
	)
}
