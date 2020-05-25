import { createAction, createReducer, Dispatch } from 'redux-act'

interface IState {
	files: IFileList
	results: IValidation
}

const initialState: IState = {
	files: [],
	results: {},
}

export const reducer = createReducer<typeof initialState>({}, initialState)

export const postFiles = createAction<IFileList, 'POST_FILES'>('POST_FILES')
export const validateProject = createAction<IProject[], 'STATE_VALIDATION'>('STATE_VALIDATION')

reducer.on(postFiles, (state: IState, files: IFileList = []) => ({
	...state,
	files: [...files],
}))

reducer.on(validateProject, (state: IState, projects: IProject[]) => {
	const trimExtenstion = (string: string): string => string.replace(/\.[^/.]+$/, '')
	const toMegabytes = (value: number): string => (value / 1024 ** 2).toFixed(2) + 'MB'
	const toKilobytes = (value: number): string => (value / 1024).toFixed(2) + 'KB'

	const extractImageNames = function (skin: { [x: string]: any }, collection: Set<string>) {
		Object.keys(skin).forEach(key => {
			const image = skin[key]
			if (image.path) {
				collection.add(image.path)
			} else if (image.name) {
				collection.add(image.name)
			} else if (image.type === 'mesh' || !image.type) {
				collection.add(key)
			}
		})
	}

	const results: IValidation = {}

	projects.forEach((project: IProject) => {
		const requiredImagesSet = new Set<string>()
		const projectImages = project.imageFiles.map(({ name }) => trimExtenstion(name))

		project.spines.forEach(spine => {
			for (let [, value] of Object.entries(spine.skeletonJson.skins)) {
				for (let i in value as any) {
					extractImageNames((value as any)[i], requiredImagesSet)
				}
			}
		})

		const requiredImages = [...requiredImagesSet]
		const res: Ivalidation['images'] = {
			size: 0,
			unused: projectImages.filter(image => !requiredImages.includes(image)),
			missed: requiredImages.filter(image => !projectImages.includes(image)),
		}

		if (res.unused.length) {
			let size = 0
			res.unused.forEach((image: string) => {
				for (let i = 0; i < project.imageFiles.length; i += 1) {
					if (project.imageFiles[i].name.replace(/\.[^/.]+$/, '') === image) {
						size = size + (project.imageFiles[i].size as any)
					}
				}
			})

			res.size = size > 102400 ? toMegabytes(size) : toKilobytes(size)
		}

		results[project.base] = {
			images: { ...res },
		}
	})

	return {
		...state,
		results: { ...results },
	}
})

export const postFilesAsync = (files: IFileList): any => (dispatch: Dispatch) => {
	dispatch(postFiles(files))
	return Promise.resolve(files)
}
