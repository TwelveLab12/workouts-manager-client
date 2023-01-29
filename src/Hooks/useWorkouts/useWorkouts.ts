import { UseQueryResult } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

import type { DataResponse, WorkoutDataResponse } from "../../api/strapi.types"
import { isErrorResponse } from "../../api/strapiTypeGuards"
import type { WorkoutProps } from "../../types/types"
import useWorkoutQueries from "../reactQueries/useWorkoutQueries"
import type { currentWorkoutProps } from "../useCurrentWorkout/useCurrentWorkout"
import useFormatResponse from "../useFormatStrapiResponse/useFormatStrapiResponse"

export type removeWorkoutType =
    (workoutId: number | string) => void

interface useWorkoutsProps {
    currentWorkout: currentWorkoutProps
    onlyFavorites?: boolean
}
interface useWorkoutsOutput {
    workouts: WorkoutProps[]
    removeWorkout: removeWorkoutType
}

const useWorkouts = ({ currentWorkout, onlyFavorites }: useWorkoutsProps): useWorkoutsOutput => {
    const { getWorkouts, workoutsData, workoutsQueryError, refetch } = useWorkoutQueries()
    const [workouts, setWorkouts] = useState<WorkoutProps[]>([])
    const { formatWorkoutResponse } = useFormatResponse()
    const [prevCurrentWorkoutId, setPrevCurrentWorkoutId] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (prevCurrentWorkoutId !== currentWorkout?.id) {
            setPrevCurrentWorkoutId(currentWorkout?.id ?? undefined)
            refetch()
        }

        if (
            (getWorkouts as UseQueryResult<[DataResponse]>)?.isSuccess &&
            !workoutsQueryError &&
            !isErrorResponse(workoutsData)
        ) {

            const mappedWorkouts = workoutsData?.filter((workout: WorkoutDataResponse) => {

                if (onlyFavorites && !workout.attributes.isFavorite) {
                    return false
                }
                return workout.id !== currentWorkout?.id
            }).map(
                (workout: WorkoutDataResponse): WorkoutProps => {
                    return formatWorkoutResponse(workout)
                },
            )
            setWorkouts(() => mappedWorkouts ? [...mappedWorkouts] : [])
        }

    }, [workoutsData, currentWorkout])

    const removeWorkout = useCallback((workoutId: number | string): void => {
        const newWorkouts = workouts.filter((workout) => {
            return workout.id !== workoutId
        })
        setWorkouts(() => [...newWorkouts])
    }, [workouts])
    return { workouts, removeWorkout }
}

export default useWorkouts