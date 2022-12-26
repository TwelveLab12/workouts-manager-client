import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import useExerciseQueries from '../../Hooks/reactQueries/useExerciseQueries'
import { DataResponse, ExerciseDataResponse } from '../../api/strapi.types'
import CurrentExercisesComponent from '../../Components/CurrentExercises/Exercises'
import { ExerciseProps } from "../../types/types"
import { UseQueryResult } from "@tanstack/react-query/build/lib/types"
import { isErrorResponse } from "../../api/starpiTypeGuards"

const CurrentWorkout = (): JSX.Element => {
  const [getExercises, exercisesData, exercisesQueryError] = useExerciseQueries()
  const [exercises, setExercises] = useState<undefined | ExerciseProps[]>(undefined)

  useEffect(() => {
    if ((getExercises as UseQueryResult<[DataResponse]>)?.isSuccess
      && !exercisesQueryError
      && !isErrorResponse(exercisesData)) {
      const mappedExercises = (exercisesData as [DataResponse]).map((exercise: ExerciseDataResponse) => ({
        id: exercise.id,
        label: exercise.attributes.label,
        description: exercise.attributes.description,
        counter: exercise.attributes.counter,
        createdAt: exercise.attributes.createdAt,
        updatedAt: exercise.attributes.updatedAt,
        editMode: false
      } as ExerciseProps))
      setExercises(() => mappedExercises ?? undefined)
    }
  }, [exercisesData])

  return (<>
    <Typography variant="h2" color="inherit" noWrap>
      Workout of the day
    </Typography>
    {<CurrentExercisesComponent exercises={exercises} setExercises={setExercises} />}
  </>)
}

export default CurrentWorkout
