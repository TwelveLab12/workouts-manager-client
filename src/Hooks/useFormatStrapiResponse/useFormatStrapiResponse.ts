import { ExerciseDataResponse, LibraryExerciseDataResponse, WorkoutDataResponse } from "../../api/strapi.types";
import { ExerciseProps, LibraryExerciseProps, WorkoutProps } from "../../types/types";

type formatWorkoutResponseOutput = (data: WorkoutDataResponse) => WorkoutProps
type formatExerciseResponseOutput = (data: ExerciseDataResponse) => ExerciseProps
type formatLibraryExerciseResponseOutput = (data: LibraryExerciseDataResponse) => LibraryExerciseProps

const useFormatResponse = (): {
    formatWorkoutResponse: formatWorkoutResponseOutput,
    formatExerciseResponse: formatExerciseResponseOutput,
    formatLibraryExerciseResponse: formatLibraryExerciseResponseOutput
} => {

    const formatWorkoutResponse = (data: WorkoutDataResponse): WorkoutProps => {
        const formatedData: WorkoutProps = {
            id: data.id,
            label: data.attributes?.label,
            description: data.attributes?.description ?? '',
            createdAt: data.attributes.createdAt,
            updatedAt: data.attributes.updatedAt,
        }
        return formatedData
    }

    const formatLibraryExerciseResponse = (data: LibraryExerciseDataResponse): LibraryExerciseProps => {
        const formatedData: LibraryExerciseProps = {
            id: data.id,
            label: data.attributes?.label,
            description: data.attributes?.description ?? '',
            createdAt: data.attributes.createdAt,
            updatedAt: data.attributes.updatedAt,
        }
        return formatedData
    }

    const formatExerciseResponse = (data: ExerciseDataResponse): ExerciseProps => {
        const formatedData: ExerciseProps = {
            id: data.id,
            label: data.attributes?.label,
            description: data.attributes.description ?? '',
            counter: data.attributes.counter,
            repetition: data.attributes.repetition,
            weight: data.attributes.weight,
            rest: data.attributes.rest,
            createdAt: data.attributes.createdAt,
            updatedAt: data.attributes.updatedAt,
            editMode: false,
            // relationships
            workout: (data.attributes?.workout?.data) ? formatWorkoutResponse(data.attributes.workout.data) : undefined,
            libraryExercise: (data.attributes?.exercise_library?.data) ? formatLibraryExerciseResponse(data.attributes.exercise_library.data) : undefined,
        }

        return formatedData
    }

    return {
        formatWorkoutResponse,
        formatExerciseResponse,
        formatLibraryExerciseResponse
    }
}

export default useFormatResponse