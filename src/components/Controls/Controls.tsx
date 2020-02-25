import React from 'react'
import { connect } from 'react-redux'
import { SimpleActionCreator } from 'redux-act'
import { RootState } from '../../reducers'
import { stateValidation } from '../../reducers/data.reducer'
import Collapse from './Collapse'
import Input from '../Input'
import * as S from './styled'

type ControlsProps = {
	projects: IProject[]
	stateValidation: SimpleActionCreator<IValidation, 'STATE_VALIDATION'>
}

class Controls extends React.PureComponent<ControlsProps, {}> {
	componentDidUpdate() {
		this.props.stateValidation(this.validateProjects(this.props.projects))
	}

	validateProjects(projects: IProject[]) {
		function extractImageStrings(skin: { [x: string]: any }, collection: Set<string>) {
			Object.keys(skin).forEach(key => {
				const image = skin[key]
				if (image.path) {
					collection.add(image.path)
				} else if (image.name) {
					collection.add(image.name)
				} else if (image.type === 'mesh' || !image.type) {
					collection.add(key)
				}
			})
		}

		const validationResults: IValidation = {}

		projects.forEach((project: IProject) => {
			const requiredImagesSet = new Set<string>()
			const projectImages: string[] = project.imageFiles.map(image =>
				image.name.replace(/\.[^/.]+$/, '')
			)

			project.spines.forEach(spine => {
				for (let [, value] of Object.entries(spine.skeletonJson.skins)) {
					for (let i in value as any) {
						extractImageStrings((value as any)[i], requiredImagesSet)
					}
				}
			})

			const requiredImages = [...requiredImagesSet]

			validationResults[project.base] = {
				unusedImages: projectImages.filter(image => !requiredImages.includes(image)),
				missedImages: requiredImages.filter(image => !projectImages.includes(image)),
			}
		})

		return validationResults
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

function mapStateToProps(state: RootState) {
	return {
		projects: state.data.projects,
	}
}

const mapDispatchToProps = {
	stateValidation,
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
