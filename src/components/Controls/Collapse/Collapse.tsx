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

class Button extends React.Component<ButtonProps, { active: boolean }> {
	constructor(props: any) {
		super(props)

		this.state = {
			active: false,
		}

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
			<S.Button
				group={this.props.group}
				active={this.state.active.toString()}
				onClick={this.handleClick}
			>
				{this.props.name}
			</S.Button>
		)
	}
}

type ButtonGroupProps = {
	group: 'skins' | 'animations'
	spine: ISpine
	project: IProject
	controlState: IControlState
}

function ButtonGroup({ group, spine, project, controlState }: ButtonGroupProps) {
	const handleControlSet = (opts: IControlState) => {
		dispatch(setControlAsync(opts)).then((opts: IControlState) => {
			window.postMessage(
				{
					projectName: project.base,
					spineName: opts.spine,
					animation: opts.animation,
					skin: opts.skin,
				},
				'*'
			)
		})
	}

	return (
		<S.ButtonGroup>
			{spine[group].map((name, index) => (
				<Button
					key={`${index}-${group}`}
					animation={group === 'animations' ? name : spine.animations[0]}
					controlState={controlState}
					group={group}
					handleControlSet={handleControlSet}
					name={name}
					skin={group === 'skins' ? name : spine.skins[0]}
					spine={spine.skeletonFile.name}
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
		return (
			<S.Collapse defaultActiveKey={[...this.props.projects.keys()]}>
				{this.props.projects.map((project: IProject, index: number) => (
					<S.Panel
						header={
							<PanelHeader
								title={project.base}
								validationResults={this.props.validationResults[project.base]}
							/>
						}
						key={index.toString()}
					>
						{project.spines.map((spine: ISpine, index: number) => (
							<S.PanelSection key={`${index}-PanelSection`}>
								<S.PanelSectionTitle>{spine.skeletonFile.name}</S.PanelSectionTitle>

								<ButtonGroup
									group="animations"
									spine={spine}
									project={project}
									controlState={this.props.controlState}
								/>
								<ButtonGroup
									group="skins"
									spine={spine}
									project={project}
									controlState={this.props.controlState}
								/>
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
