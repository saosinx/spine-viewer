import { connect } from 'react-redux'

import { RootState } from '../../store'
import { validateProject } from './reducer'
import Controls from './Controls'

const mapStateToProps = (state: RootState) => ({
	projects: state.init.projects,
})

const mapDispatchToProps = {
	validateProject,
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)

export { reducer } from './reducer'
