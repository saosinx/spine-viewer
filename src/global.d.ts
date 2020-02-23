interface IFile {
	lastModified: number
	name: string
	size: number
	type: string
	webkitRelativePath: string
}

interface ISpine {
	animations: string[]
	skeletonFile: IFile
	skeletonJson: {
		animations: {
			[s: string]: unknown
		}
		bones: ArrayLike<unknown>
		skeleton: {
			hash: string
			height: number
			spine: string
			width: number
		}
		skins: { [s: string]: unknown } | ArrayLike<unknown>
		slots: ArrayLike<unknown>
	}
	skins: string[]
}

interface IProject {
	base: string
	imageFiles: IFile[]
	imagesMap: {}
	spines: ISpine[]
}

interface IValidationResults {
	unusedImages: string[]
	missedImages: string[]
}

interface IValidation {
	[key: string]: IValidationResults
}
