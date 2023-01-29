import { isErrorResponse } from "../../../api/strapiTypeGuards"
import useExerciseQueryStatus from "../../../Hooks/useExerciseQueryStatus/useExerciseQueryStatus"
import { updateExercise } from "../../../Queries/exerciseQueries"
import type { queryResponseOutput } from "../../../Queries/query.types"
import { errorResponse, successResponse } from "../../../Queries/QueryResponseBuilder"
import type { ExerciseProps } from "../../../types/types"


interface useExerciseOutput {
    updatePromise: (exercise: ExerciseProps, data?: undefined | ExerciseProps) => Promise<queryResponseOutput>
}

const useExercise = (): useExerciseOutput => {
    const { dispatchFetchStatus, dispatchReleaseStatus } = useExerciseQueryStatus()

    const updatePromise = async (
        exercise: ExerciseProps,
        data: undefined | ExerciseProps = undefined,
    ): Promise<queryResponseOutput> => {
        dispatchFetchStatus()
        return await updateExercise(exercise.id, data ?? exercise)
            .then((response) => {
                if (isErrorResponse(response)) {
                    return errorResponse('Exercise update error', response)
                }
                return successResponse('Exercise update success', response)
            })
            .catch((error) => {
                return errorResponse('Exercise update error', error)
            })
            .finally(() => dispatchReleaseStatus())
    }

    return { updatePromise }
}

export default useExercise
