interface IFile {
	lastModified: number
	name: string
	size: number
	type: string
	webkitRelativePath: string
}

interface IFileList extends Array {
	[Symbol.iterator](): IterableIterator<IFile>
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
	imagesMap: Object
	spines: ISpine[]
}

interface Ivalidation {
	images: {
		size: string | number
		unused: string[]
		missed: string[]
	}
}

interface IValidation {
	[key: string]: Ivalidation
}
