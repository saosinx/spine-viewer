interface IFile extends File {
	readonly size: number
	readonly type: string
	readonly webkitRelativePath: string
}

interface IFileList {
	[Symbol.iterator](): IterableIterator<File>
}

interface IImageFile extends IFile {}
interface ISkeletonFile extends IFile {}

interface ISlot {
	readonly attachment: string
	readonly blend: string
	readonly bone: string
	readonly name: string
}

interface IBone {
	readonly name: string
	readonly parent?: string
	readonly x?: number
	readonly y?: number
}

interface ISpine {
	readonly animations: Array<string>
	readonly skeletonFile: ISkeletonFile
	readonly skeletonJson: {
		readonly animations: {
			[key: string]: unknown
		}
		readonly bones: Array<IBone>
		readonly skeleton: {
			audio: string
			hash: string
			images: string
			spine: string
			height: number
			width: number
		}

		readonly skins:
			| {
					[key: string]: {
						[key: string]: {
							height: number
							name: string
							scaleX: number
							scaleY: number
							width: number
							y: number
						}
					}
			  }
			| ['default']
		readonly slots: Array<ISlot>
	}
	readonly skins: Array<string>
}

interface IProject {
	readonly base: string
	readonly imageFiles: Array<IImageFile>
	readonly imagesMap: Object
	readonly spines: Array<ISpine>
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
