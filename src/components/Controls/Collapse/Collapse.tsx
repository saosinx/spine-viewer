import React from 'react'
import { connect } from 'react-redux'
import { Tooltip as AntdTooltip } from 'antd'
import { dispatch } from '../../../store'
import { RootState } from '../../../reducers'
import { setControlAsync, IState as IControlState } from '../../../reducers/control.reducer'
import * as S from './styled'

export type ButtonProps = {
	animation: string
	group: 'skins' | 'animations'
	skin: string
	spine: string
	name: string
	controlState: IControlState

	handleControlSet(opts: IControlState): void
}

class Button extends React.Component<ButtonProps, {}> {
	constructor(props: ButtonProps) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		let animationToSet, skinToSet

		if (this.props.spine !== this.props.controlState.spine) {
			animationToSet = this.props.group === 'skins' ? this.props.animation : this.props.animation
			skinToSet = this.props.group === 'animations' ? this.props.skin : this.props.skin
		} else {
			animationToSet =
				this.props.group === 'skins'
					? this.props.controlState.animation || this.props.animation
					: this.props.animation
			skinToSet =
				this.props.group === 'animations'
					? this.props.controlState.skin || this.props.skin
					: this.props.skin
		}

		this.props.handleControlSet({
			animation: animationToSet,
			skin: skinToSet,
			spine: this.props.spine,
		})
	}

	render() {
		return (
			<S.Button group={this.props.group} onClick={this.handleClick}>
				{this.props.name}
			</S.Button>
		)
	}
}

type ButtonGroupProps = {
	skin?: boolean
	spine: ISpine
	project: IProject
	controlState: IControlState
}

function ButtonGroup(props: ButtonGroupProps) {
	const handleControlSet = (opts: IControlState) => {
		dispatch(setControlAsync(opts)).then((opts: IControlState) => {
			window.postMessage(
				{
					projectName: props.project.base,
					spineName: opts.spine,
					animation: opts.animation,
					skin: opts.skin,
				},
				'*'
			)
		})
	}

	const group = props.skin ? 'skins' : 'animations'
	const { spine, controlState } = props

	return (
		<S.ButtonGroup>
			{props.spine[group].map((name, index) => (
				<Button
					key={index.toString()}
					animation={group === 'animations' ? name : spine.animations[0]}
					skin={group === 'skins' ? name : spine.skins[0]}
					spine={spine.skeletonFile.name}
					{...{ group, name, controlState, handleControlSet }}
				/>
			))}
		</S.ButtonGroup>
	)
}

function Tooltip(props: any) {
	return (
		<AntdTooltip
			title={props.title}
			overlayStyle={{
				whiteSpace: 'pre-wrap',
			}}
			placement="bottom"
			mouseEnterDelay={0}
		>
			{props.children}
		</AntdTooltip>
	)
}

type PanelHeaderProps = {
	title: string
	validationResults: IValidationResults
}

function PanelHeader(props: PanelHeaderProps) {
	return (
		<S.PanelHeader>
			<span>{props.title}</span>
			{!!props.validationResults && (
				<>
					{!!props.validationResults.unusedImages.length && (
						<Tooltip
							title={`${
								props.validationResults.unusedImages.length
							} unused images:\n${props.validationResults.unusedImages.join('\n')}`}
						>
							<S.Icon type="warning" theme="twoTone" twoToneColor="#ffcc00" />
						</Tooltip>
					)}
					{!!props.validationResults.missedImages.length && (
						<Tooltip
							title={`${
								props.validationResults.missedImages.length
							} missed images:\n${props.validationResults.missedImages.join('\n')}`}
						>
							<S.Icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96" />
						</Tooltip>
					)}
				</>
			)}
		</S.PanelHeader>
	)
}

type CollapseProps = {
	projects: IProject[]
	validationResults: IValidation | any
	controlState: {
		animation: string
		spine: string
		skin: string
	}
}

class Collapse extends React.PureComponent<CollapseProps, {}> {
	render() {
		const { projects, controlState, validationResults } = this.props

		return (
			<S.Collapse defaultActiveKey={[...projects.keys()]}>
				{projects.map((project: IProject, index: number) => (
					<S.Panel
						key={index.toString()}
						header={
							<PanelHeader
								title={project.base}
								validationResults={validationResults[project.base]}
							/>
						}
					>
						{project.spines.map((spine: ISpine, index: number) => (
							<S.PanelSection key={index.toString()}>
								<S.PanelSectionTitle>{spine.skeletonFile.name}</S.PanelSectionTitle>
								<ButtonGroup {...{ spine, project, controlState }} />
								<ButtonGroup skin {...{ spine, project, controlState }} />
							</S.PanelSection>
						))}
					</S.Panel>
				))}
			</S.Collapse>
		)
	}
}

function mapStateToProps(state: RootState) {
	return {
		controlState: {
			...state.control,
		},
		validationResults: state.data.validationResults,
	}
}

export default connect(mapStateToProps)(Collapse)
