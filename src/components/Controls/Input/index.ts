import { connect } from 'react-redux'
import { postFilesAsync } from '../reducer'
import { RootState } from '../../../store'

import Input from './Input'

const mapStateToProps = (state: RootState) => ({
	files: state.validation.files,
})

const mapDispatchToProps = {
	postFilesAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
