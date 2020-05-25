import Collapse from './Collapse'
import { connect } from 'react-redux'

import { RootState } from '../../../store'

const mapStateToProps = (state: RootState) => ({
	activeProject: {
		...state.project,
	},
	results: state.validation.results,
})

export default connect(mapStateToProps)(Collapse)
