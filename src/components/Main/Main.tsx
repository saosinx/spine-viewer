import React, { useEffect } from 'react'

import { getProjects } from './reducer'
import Controls from '../Controls'
import Canvas from '../Canvas'

import './styles.scss'

type Props = {
	getProjects: typeof getProjects
}

export const Main = ({ getProjects }: Props) => {
	useEffect(() => {
		function handleMessage(ev: MessageEvent) {
			if (ev.data.projects) {
				getProjects(ev.data.projects)
			}
		}

		window.addEventListener('message', handleMessage)

		return () => window.removeEventListener('message', handleMessage)
	}, [])

	return (
		<main className="main">
			<Controls />
			<Canvas />
		</main>
	)
}
