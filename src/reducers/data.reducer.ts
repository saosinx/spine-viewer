import { createAction, createReducer, Dispatch } from 'redux-act'

interface IState {
	projects: IProject[]
	files: IFileList
	validation: IValidation
}

const initialState: IState = {
	projects: [],
	files: [],
	validation: {},
}

const reducer = createReducer<typeof initialState>({}, initialState)

export const getProjects = createAction<IProject[], 'GET_PROJECTS'>('GET_PROJECTS')
export const postFiles = createAction<IFileList, 'POST_FILES'>('POST_FILES')
export const stateValidation = createAction<IProject[], 'STATE_VALIDATION'>('STATE_VALIDATION')

reducer.on(getProjects, (state: IState, projects: IProject[]) => ({
	...state,
	projects: [...projects],
}))

reducer.on(postFiles, (state: IState, files: IFileList = []) => ({
	...state,
	files: [...files],
}))

reducer.on(stateValidation, (state: IState, projects: IProject[]) => {
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

	const validation: IValidation = {}

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
		const results: Ivalidation['images'] = {
			size: 0,
			unused: projectImages.filter(image => !requiredImages.includes(image)),
			missed: requiredImages.filter(image => !projectImages.includes(image)),
		}

		if (results.unused.length) {
			let size = 0
			results.unused.forEach((image: string) => {
				for (let i = 0; i < project.imageFiles.length; i += 1) {
					if (project.imageFiles[i].name.replace(/\.[^/.]+$/, '') === image) {
						size = size + (project.imageFiles[i].size as any)
					}
				}
			})

			results.size = size > 102400 ? toMegabytes(size) : toKilobytes(size)
		}

		validation[project.base] = {
			images: { ...results },
		}
	})

	return {
		...state,
		validation: { ...validation },
	}
})

export const postFilesAsync = (files: IFileList): any => (dispatch: Dispatch) => {
	dispatch(postFiles(files))
	return Promise.resolve(files)
}

export default reducer
