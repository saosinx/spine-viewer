import { connect } from 'react-redux'

import { getProjects } from './reducer'
import Main from './Main'

const mapDispatchToProps = {
	getProjects,
}

export default connect(null, mapDispatchToProps)(Main)

export { reducer } from './reducer'
