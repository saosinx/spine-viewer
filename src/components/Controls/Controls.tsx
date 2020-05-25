import React from 'react'

import { validateProject } from './reducer'
import Collapse from './Collapse'
import Input from './Input'
import * as S from './styled'

type ControlsProps = {
	projects: IProject[]
	validateProject: typeof validateProject
}

class Controls extends React.PureComponent<ControlsProps, {}> {
	public componentDidUpdate() {
		this.props.validateProject(this.props.projects)
	}

	public render() {
		return (
			<S.Controls>
				<Input />
				{!!this.props.projects.length && <Collapse projects={this.props.projects} />}
			</S.Controls>
		)
	}
}

export default Controls
