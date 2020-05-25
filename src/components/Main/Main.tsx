import React from 'react'

import { getProjects } from './reducer'
import Controls from '../Controls'
import Canvas from '../Canvas'
import * as S from './styled'

type MainProps = {
	getProjects: typeof getProjects
}

export default class Main extends React.PureComponent<MainProps, {}> {
	constructor(props: any) {
		super(props)

		this.handleMessage = this.handleMessage.bind(this)
	}

	private handleMessage(ev: MessageEvent) {
		if (ev.data.projects) {
			this.props.getProjects(ev.data.projects)
		}
	}

	public componentDidMount() {
		window.addEventListener('message', this.handleMessage)
	}

	public componentWillUnmount() {
		window.removeEventListener('message', this.handleMessage)
	}

	public render() {
		return (
			<S.Main>
				<Controls />
				<Canvas />
			</S.Main>
		)
	}
}
