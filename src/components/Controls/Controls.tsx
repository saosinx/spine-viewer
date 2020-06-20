import React, { useEffect } from 'react'

import { validateProject } from './reducer'
import Collapse from './Collapse'
import Input from './Input'
import './styles.scss'

type Props = {
	projects: Array<IProject>
	validateProject: typeof validateProject
}

export const Controls = ({ projects, validateProject }: Props) => {
	useEffect(() => {
		validateProject(projects)
	}, [projects])

	return (
		<div className="controls">
			<Input />
			{Boolean(projects.length) && <Collapse projects={projects} />}
		</div>
	)
}
