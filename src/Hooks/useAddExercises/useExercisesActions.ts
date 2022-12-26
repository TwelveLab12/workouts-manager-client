import { ExerciseDataResponse } from "../../api/strapi.types";
import { createExercise } from "../../Queries/Exercise";
import { DuplicatedExerciseProps, ExerciseProps, InitialExerciseProps, WorkoutProps } from "../../types/types";
import useExerciseQueryStatus from "../useExerciseQueryStatus/useExerciseQueryStatus";
import useFormatResponse from "../useFormatStrapiResponse/useFormatStrapiResponse";

const useExercisesActions = (): {
    addExercise: (currentWorkout: undefined | WorkoutProps, data?: DuplicatedExerciseProps | undefined) => Promise<undefined | ExerciseProps>,
    duplicateExercise: (dataToDuplicate: DuplicatedExerciseProps) => Promise<undefined | ExerciseProps>,
} => {

    const initialData: InitialExerciseProps = {
        id: undefined,
        label: undefined,
        description: undefined,
        counter: 0,
        repetition: 0,
        weight: 0,
        rest: 0,
        editMode: false,
        createdAt: undefined,
        updatedAt: undefined,
    }

    const { formatExerciseResponse } =
        useFormatResponse()
    const { isFetching, dispatchFetchStatus, dispatchReleaseStatus } = useExerciseQueryStatus()

    const addExercise = async (currentWorkout: undefined | WorkoutProps, data: DuplicatedExerciseProps | undefined)
        : Promise<ExerciseProps | undefined> => {
        if (!currentWorkout || isFetching) {
            return undefined
        }
        const createExerciseData: InitialExerciseProps | DuplicatedExerciseProps = (data)
            ? { ...data, workout: currentWorkout }
            : { ...initialData, workout: currentWorkout?.id }

        dispatchFetchStatus()
        const createdExercise: ExerciseProps | undefined = await createExercise(createExerciseData)
            .then((response): ExerciseProps => {
                return {
                    ...formatExerciseResponse(response as ExerciseDataResponse),
                    editMode: true,
                }
            })
            .catch((error) => {
                console.error(error)
                return undefined
            })
            .finally(() => {
                dispatchReleaseStatus()
                return undefined
            })

        return createdExercise
    }

    const duplicateExercise = async (dataToDuplicate: DuplicatedExerciseProps): Promise<ExerciseProps | undefined> => {
        return await addExercise(dataToDuplicate.workout, dataToDuplicate)
    }

    return { addExercise, duplicateExercise }

}

export default useExercisesActions