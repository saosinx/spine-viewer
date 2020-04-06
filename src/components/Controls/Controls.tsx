import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../reducers'
import { stateValidation } from '../../reducers/data.reducer'
import Collapse from './Collapse'
import Input from '../Input'
import * as S from './styled'

type ControlsProps = {
	projects: IProject[]
	stateValidation: typeof stateValidation
}

class Controls extends React.PureComponent<ControlsProps, {}> {
	componentDidUpdate() {
		this.props.stateValidation(this.props.projects)
	}

	render() {
		return (
			<S.Controls>
				<Input />
				{!!this.props.projects.length && <Collapse projects={this.props.projects} />}
			</S.Controls>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	projects: state.data.projects,
})

const mapDispatchToProps = {
	stateValidation,
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
