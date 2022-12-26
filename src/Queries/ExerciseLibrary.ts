import { strapiFetch } from '../api/api'
import { strapiApiRoutes } from '../api/routes'

const { exerciseLibrary } = strapiApiRoutes

export const fetchLibraryExercises = async () => {
    return await strapiFetch(exerciseLibrary.list)
}
