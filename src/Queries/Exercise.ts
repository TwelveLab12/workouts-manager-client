import { strapiFetch } from '../api/api'
import { strapiApiRoutes } from '../api/routes'

const { exercises } = strapiApiRoutes


export const fetchExercises = async () => {
    return await strapiFetch(exercises.list)
}

