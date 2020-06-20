import React, { useRef } from 'react'

import { postFilesAsync } from '../reducer'

import './styles.scss'

const FileInput = React.forwardRef<HTMLInputElement, { onChange(): void }>(({ onChange }, ref) => (
	<input
		className="input-file_input"
		{...{
			onChange: onChange,
			ref: ref,
			type: 'file',
			directory: '',
			mozdirectory: '',
			webkitdirectory: '',
			multiple: true,
		}}
	/>
))

const InputButton = ({ onClick }: any) => (
	<button className="input-file_button" type="button" onClick={onClick}>
		<i>
			<svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor">
				<path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
			</svg>
		</i>
		<span>Choose folder</span>
	</button>
)

type Props = {
	files: Array<IFile>
	postFilesAsync: typeof postFilesAsync
}

export const Input = ({ files, postFilesAsync }: Props) => {
	const inputFileRef = useRef<HTMLInputElement>(null)

	const handleChange = () => {
		const files: Array<IFile> = Object.values(
			inputFileRef.current!.files as Array<IFile> | IFileList
		)

		postFilesAsync(files).then(() => window.postMessage({ files }, '*'))
	}

	const handleClick = () => {
		inputFileRef.current!.click()
	}

	return (
		<div className="input-file_container">
			<div className="input-file_inner">
				<FileInput onChange={handleChange} ref={inputFileRef} />
				<InputButton onClick={handleClick} />
			</div>
			{Boolean(files.length) && <span className="input-file_log">{`${files.length} files`}</span>}
		</div>
	)
}
