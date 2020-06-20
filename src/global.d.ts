interface IFile {
	lastModified: number
	name: string
	size: number
	type: string
	webkitRelativePath: string
}

interface ISpine {
	animations: Array<string>
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
	skins: Array<string>
}

interface IProject {
	base: string
	imageFiles: Array<IFile>
	imagesMap: Object
	spines: Array<ISpine>
}

interface Ivalidation {
	images: {
		size: string | number
		unused: Array<string>
		missed: Array<string>
	}
}

interface IValidation {
	[key: string]: Ivalidation
}
