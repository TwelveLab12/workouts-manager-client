import { UseQueryResult } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import type { DataResponse, WorkoutDataResponse } from '../../api/strapi.types'
import { isErrorResponse } from '../../api/strapiTypeGuards'
import workout from '../../Components/Workout/Workout'
import type { WorkoutProps } from '../../types/types'
import useWorkoutQueries from '../reactQueries/useWorkoutQueries'
import useAppLocalStorage from '../useAppLocalStorage/useAppLocalStorage'
import type { currentWorkoutProps } from '../useCurrentWorkout/useCurrentWorkout'
import useFormatResponse from '../useFormatStrapiResponse/useFormatStrapiResponse'

export type removeWorkoutType = (workoutId: number | string) => void

interface useWorkoutsProps {
    onlyFavorites?: boolean
}
interface useWorkoutsOutput {
    workouts: WorkoutProps[]
    setWorkoutsStored: Dispatch<SetStateAction<WorkoutProps[]>>
    removeWorkout: removeWorkoutType
}

const useWorkouts = ({ onlyFavorites }: useWorkoutsProps): useWorkoutsOutput => {
    const { workoutsStored, setWorkoutsStored } = useAppLocalStorage()

    const removeWorkout = useCallback(
        (workoutId: number | string): void => {
            const newWorkouts = workoutsStored.filter((workout) => {
                return workout.id !== workoutId
            })
            setWorkoutsStored(() => [...newWorkouts])
        },
        [workoutsStored],
    )

    const workouts = useMemo(() => {
        if (onlyFavorites) {
            return workoutsStored.filter((workoutItem) => {
                return workoutItem?.isFavorite
            })
        }
        return workoutsStored
    }, [workoutsStored, onlyFavorites])

    return { workouts, setWorkoutsStored, removeWorkout }
}

export default useWorkouts
