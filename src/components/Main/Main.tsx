import React from 'react'
import Controls from '../Controls'
import Canvas from '../Canvas'
import * as S from './styled'

export default function Main() {
	return (
		<S.Main>
			<Controls />
			<Canvas />
		</S.Main>
	)
}
