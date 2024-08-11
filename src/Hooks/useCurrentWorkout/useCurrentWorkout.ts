import { Dispatch, SetStateAction, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { isErrorResponse } from '../../api/strapiTypeGuards'
import { newWorkoutTemplate } from '../../data/templates'
import { useAppStatusContext } from '../../Providers/AppStatusProvider'
import { postWorkout } from '../../Queries/workoutQueries'
import { appRoutes } from '../../routes/appRoutes'
import type { WorkoutProps } from '../../types/types'
import useAppLocalStorage from '../useAppLocalStorage/useAppLocalStorage'
import useFormatResponse from '../useFormatStrapiResponse/useFormatStrapiResponse'

export type currentWorkoutProps = null | WorkoutProps
export type setCurrentWorkoutProps = Dispatch<SetStateAction<currentWorkoutProps>>
export type copyWorkoutToCurrentType = (workout: WorkoutProps) => void

interface useCurrentWorkoutOutput {
    copyWorkoutToCurrent: copyWorkoutToCurrentType
    currentWorkout: currentWorkoutProps
    setCurrentWorkout: setCurrentWorkoutProps
    // updateCurrentWorkout: (currentWorkoutId: number | undefined) => void
    initWorkout: () => void
    resetCurrentWorkout: () => void
    storeToHistory: () => void
}

const useCurrentWorkout = (): useCurrentWorkoutOutput => {
    const { isOnline } = useAppStatusContext()
    const navigate = useNavigate()
    const { workouts: workoutsAppRoute } = appRoutes

    const { formatWorkoutResponse } = useFormatResponse()

    const {
        workoutsStored,
        setWorkoutsStored,
        currentWorkoutStored: currentWorkout,
        setCurrentWorkoutStored: setCurrentWorkout,
        storedExercises,
        setStoredExercises,
    } = useAppLocalStorage()

    function getMaxWorkoutId(): number {
        if (!workoutsStored?.length) {
            return 1
        }
        const workoutMaxId = Math.max.apply(
            null,
            workoutsStored.map((workout) => workout?.id ?? 0),
        )
        if (workoutMaxId === -Infinity) {
            return 1
        }
        return workoutMaxId + 1
    }

    const initWorkout = (): void => {
        if (isOnline) {
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

        setCurrentWorkout(newWorkoutTemplate(getMaxWorkoutId()))
    }

    const resetCurrentWorkout = (): void => {
        setCurrentWorkout((current) => null)
        setStoredExercises((current) => [])
    }

    const storeToHistory = useCallback((): void => {
        setWorkoutsStored((current) => {
            if (!currentWorkout) {
                return current
            }

            return [...current, { ...currentWorkout, exercises: storedExercises }]
        })
        resetCurrentWorkout()
        navigate(workoutsAppRoute)
    }, [currentWorkout])

    const copyWorkoutToCurrent = (workout: WorkoutProps): true => {
        const { exercises, id, ...currentWorkout } = workout
        setCurrentWorkout({ ...currentWorkout, id: getMaxWorkoutId() })
        setStoredExercises(exercises ?? [])
        return true
    }

    return {
        copyWorkoutToCurrent,
        currentWorkout,
        initWorkout,
        resetCurrentWorkout,
        setCurrentWorkout,
        storeToHistory,
        // updateCurrentWorkout,
    }
}

export default useCurrentWorkout
