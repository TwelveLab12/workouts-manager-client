import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import type { ExerciseDataResponse } from '../../api/strapi.types'
import { isErrorResponse } from '../../api/strapiTypeGuards'
import { useAppStatusContext } from '../../Providers/AppStatusProvider'
import { fetchExercisesByWorkout } from '../../Queries/exerciseQueries'
import type { ExerciseProps, WorkoutProps } from '../../types/types'
import useAppLocalStorage from '../useAppLocalStorage/useAppLocalStorage'
import useFormatResponse from '../useFormatStrapiResponse/useFormatStrapiResponse'

interface useExercisesOutput {
    exercises: ExerciseProps[]
    setExercises: Dispatch<SetStateAction<ExerciseProps[]>>
    exercisesData: undefined | ExerciseDataResponse[]
    isLoaded: boolean
    exercisesQueryError: boolean
}

interface useExercisesProps {
    workout: WorkoutProps | undefined | undefined
}

const useExercises = ({ workout }: useExercisesProps): useExercisesOutput => {
    const { formatExerciseResponse } = useFormatResponse()
    const context = useAppStatusContext()
    const { isOnline } = context

    const { storedExercises, setStoredExercises } = useAppLocalStorage()

    const [exercisesData, setExercisesData] = useState<ExerciseDataResponse[]>([])
    const [exercises, setExercises] = useState<ExerciseProps[]>([])
    const [exercisesQueryError, setExercisesQueryError] = useState<boolean>(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [prevWorkoutId, setPrevWorkoutId] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (workout && isOnline) {
            setIsLoaded(false)
            if (workout?.id && (!prevWorkoutId || prevWorkoutId !== workout?.id)) {
                setPrevWorkoutId(workout.id)
                fetchExercisesApiData(workout)
                    .then((response) => {
                        if (response) {
                            setExercisesData(response as unknown as ExerciseDataResponse[])
                        }
                    })
                    .catch(() => setExercisesQueryError(true))
            }
            setIsLoaded(true)
        }
    }, [workout, isOnline])

    useEffect(() => {
        if (!isOnline) {
            setExercises(storedExercises)
            return
        }
        if (isLoaded && (!exercisesQueryError || !isErrorResponse(exercisesData))) {
            if (exercisesData instanceof AxiosError) {
                return
            }

            const mappedExercises = exercisesData?.length
                ? exercisesData?.map((exercise: ExerciseDataResponse): ExerciseProps => {
                      return formatExerciseResponse(exercise)
                  })
                : []

            setExercises(() => mappedExercises)
        }
    }, [isLoaded, exercisesQueryError, exercisesData, isOnline])

    useEffect(() => {
        if (exercises) setStoredExercises(exercises)
    }, [exercises])

    return { exercises, setExercises, exercisesData, isLoaded, exercisesQueryError }
}

type fetchExercisesApiDataOutput = Promise<ExerciseDataResponse[] | undefined>

const fetchExercisesApiData = async (
    workout: WorkoutProps | undefined,
): Promise<fetchExercisesApiDataOutput | undefined> => {
    if (!workout?.id) {
        return undefined
    }

    const fetchData = async (workoutId: number): fetchExercisesApiDataOutput => {
        const fetchedData = await fetchExercisesByWorkout(workoutId).then((response) => response)
        if (isErrorResponse(fetchData)) {
            console.error({ fetchData })
            throw new Error('Whoops!')
        }
        //
        return fetchedData as ExerciseDataResponse[]
    }

    return await fetchData(workout.id)
}

export default useExercises
