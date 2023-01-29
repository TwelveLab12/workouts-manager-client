import { Dispatch, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import type { WorkoutDataResponse } from "../../api/strapi.types";
import { isErrorResponse } from "../../api/strapiTypeGuards";
import { createExercise } from "../../Queries/exerciseQueries";
import { fetchWorkout, postWorkout } from "../../Queries/workoutQueries";
import { appRoutes } from "../../routes/appRoutes";
import type { ExerciseProps, WorkoutProps } from "../../types/types";
import useFormatResponse from "../useFormatStrapiResponse/useFormatStrapiResponse";
import useLocalStorage from "../useLocalStorage/useLocalStorage";

export type currentWorkoutProps = null | WorkoutProps
export type setCurrentWorkoutProps = Dispatch<SetStateAction<currentWorkoutProps>>
export type copyWorkoutToCurrentType = (workout: WorkoutProps, exercises: ExerciseProps[]) => void

interface useCurrentWorkoutOutput {
    copyWorkoutToCurrent: copyWorkoutToCurrentType
    currentWorkout: currentWorkoutProps
    setCurrentWorkout: setCurrentWorkoutProps
    updateCurrentWorkout: (currentWorkoutId: number | undefined) => void
    initWorkout: () => void
    resetCurrentWorkout: () => void
    storeToHistory: () => void
}

const useCurrentWorkout = (): useCurrentWorkoutOutput => {

    const navigate = useNavigate()
    const { workouts: workoutsAppRoute } = appRoutes

    const { formatWorkoutResponse } = useFormatResponse()

    const [currentWorkout, setCurrentWorkout] = useLocalStorage<null | WorkoutProps>(
        'current-workout',
        null,
    )

    const initWorkout = (): void => {
        postWorkout({})
            .then((response) => {
                if (isErrorResponse(response)) {
                    console.error(response)
                    return
                }
                setCurrentWorkout(() => formatWorkoutResponse(response))
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const updateCurrentWorkout = useCallback(
        (currentWorkoutId: number | undefined): void => {
            const workoutId = currentWorkoutId ?? currentWorkout?.id
            if (workoutId) {
                fetchWorkout(workoutId)
                    .then((fetchedCurrentWorkout) => {
                        setCurrentWorkout(() => formatWorkoutResponse(fetchedCurrentWorkout))
                        console.info('Current workout fetched')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        },
        [],
    )

    const resetCurrentWorkout = (): void => {
        setCurrentWorkout(null)
    }

    const storeToHistory = useCallback((): void => {
        resetCurrentWorkout()
        navigate(workoutsAppRoute)
    }, [])

    const copyWorkoutToCurrent = (workout: WorkoutProps, exercises: ExerciseProps[]): void => {
        const copyToStrapi = async (): Promise<WorkoutDataResponse> => {
            const { id, ...workoutCopy } = workout
            const newWorkout = await postWorkout({ ...workoutCopy })

            // Manage workout exercises
            if (exercises?.length) {
                const initExerciseData = { counter: 0, workout: newWorkout.id, isFavorite: false }
                exercises.map(async (exerciseItem) => {

                    const { id, counter, editMode, createdAt, updatedAt, ...exerciseCopy } = exerciseItem

                    const createExerciseData = {
                        ...exerciseCopy,
                        ...initExerciseData,
                    }
                    console.log(createExerciseData)

                    await createExercise({
                        ...exerciseCopy,
                        ...initExerciseData,
                    })
                })
            }

            return newWorkout

        }
        copyToStrapi().then((response) => {
            updateCurrentWorkout(response.id)
        })

    }

    return {
        copyWorkoutToCurrent,
        currentWorkout,
        initWorkout,
        resetCurrentWorkout,
        setCurrentWorkout,
        storeToHistory,
        updateCurrentWorkout
    }
}

export default useCurrentWorkout