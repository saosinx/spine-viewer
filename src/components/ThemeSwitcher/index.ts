import { connect } from 'react-redux'

import { ThemeSwitcher } from './ThemeSwitcher'
import { RootState } from '../../store'

const mapStateToProps = (state: RootState) => ({
	theme: state.theme.value,
})

export default connect(mapStateToProps)(ThemeSwitcher)

export { reducer } from './reducer'
