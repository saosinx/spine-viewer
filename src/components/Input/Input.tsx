import React from 'react'
import * as S from './styled'
import { connect } from 'react-redux'
import { dispatch } from '../../store'
import { RootState } from '../../reducers'
import { postFilesAsync } from '../../reducers/data.reducer'

type InputProps = {
	files: any[]
}

class Input extends React.PureComponent<InputProps, {}> {
	constructor(props: any) {
		super(props)

		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	private inputFileRef = React.createRef<HTMLInputElement>()

	handleChange() {
		const files: any[] = Object.values(this.inputFileRef.current!.files as any)
		dispatch(postFilesAsync(files)).then(() => {
			window.postMessage({ files }, '*')
		})
	}

	handleClick() {
		this.inputFileRef.current!.click()
	}

	render() {
		return (
			<S.Input>
				<S.ButtonContainer>
					<input
						{...{
							onChange: this.handleChange,
							ref: this.inputFileRef,
							type: 'file',
							directory: '',
							mozdirectory: '',
							webkitdirectory: '',
							multiple: true,
							style: {
								display: 'none',
							},
						}}
					/>
					<S.Button type="button" onClick={this.handleClick}>
						<S.Icon>
							<svg
								viewBox="64 64 896 896"
								focusable="false"
								width="1em"
								height="1em"
								fill="currentColor"
							>
								<path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
							</svg>
						</S.Icon>
						<span>Choose folder</span>
					</S.Button>
				</S.ButtonContainer>
				{!!this.props.files.length && <S.InputLog>{`${this.props.files.length} files`}</S.InputLog>}
			</S.Input>
		)
	}
}

function mapStateToProps(state: RootState) {
	return {
		files: state.data.files,
	}
}

export default connect(mapStateToProps)(Input)