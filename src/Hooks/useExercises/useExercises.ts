import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import type { ExerciseDataResponse } from "../../api/strapi.types";
import { isErrorResponse } from "../../api/strapiTypeGuards";
import { fetchExercisesByWorkout } from "../../Queries/exerciseQueries";
import type { ExerciseProps, WorkoutProps } from "../../types/types";
import useFormatResponse from "../useFormatStrapiResponse/useFormatStrapiResponse";

interface useExercisesOutput {
  exercises: ExerciseProps[]
  setExercises: Dispatch<SetStateAction<ExerciseProps[]>>
  exercisesData: undefined | ExerciseDataResponse[]
  isLoaded: boolean
  exercisesQueryError: boolean
}

interface useExercisesProps {
  workout: WorkoutProps
}

const useExercises = ({ workout }: useExercisesProps): useExercisesOutput => {

  const { formatExerciseResponse } = useFormatResponse()

  const [exercisesData, setExercisesData] = useState<ExerciseDataResponse[]>([])
  const [exercises, setExercises] = useState<ExerciseProps[]>([])
  const [exercisesQueryError, setExercisesQueryError] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [prevWorkoutId, setPrevWorkoutId] = useState<number | undefined>(undefined)

  useEffect(() => {
    const fetchData = async (workoutId: number): Promise<void> => {
      setIsLoaded(false)
      const fetchedData = await fetchExercisesByWorkout(workoutId)
      if (isErrorResponse(fetchData)) {
        setExercisesQueryError(true)
        return
      }
      setExercisesData(fetchedData as ExerciseDataResponse[])
      setIsLoaded(true)
    }

    if (workout?.id && (!prevWorkoutId && prevWorkoutId !== workout?.id)) {
      setPrevWorkoutId(workout.id)
      fetchData(workout.id)
    }
  }, [workout])

  useEffect(() => {
    if (isLoaded && (!exercisesQueryError || !isErrorResponse(exercisesData))) {
      if (exercisesData instanceof AxiosError) {
        return
      }

      const mappedExercises = (exercisesData?.length) ? exercisesData?.map(
        (exercise: ExerciseDataResponse): ExerciseProps => {
          return formatExerciseResponse(exercise)
        }
      ) : []

      setExercises(() => mappedExercises)
    }
  }, [isLoaded, exercisesQueryError, exercisesData])

  return { exercises, setExercises, exercisesData, isLoaded, exercisesQueryError }
}

export default useExercises
