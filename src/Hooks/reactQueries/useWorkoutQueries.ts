import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { WorkoutDataResponse } from "../../api/strapi.types";
import { isErrorResponse } from "../../api/strapiTypeGuards";
import { fetchWorkouts } from "../../Queries/Workout";
import { StrapiReactQueryResponse } from "./reactQueries.types";

const useWorkoutQueries = (): [
  getWorkouts: StrapiReactQueryResponse,
  workoutsData: undefined | WorkoutDataResponse[],
  workoutsQueryError: boolean,
] => {
  const [workoutsData, setWorkoutsData] = useState<undefined | WorkoutDataResponse[]>(undefined)
  const [workoutsQueryError, setWorkoutsQueryError] = useState<boolean>(false)
  const { data, error, isSuccess } = useQuery({
    queryKey: ['workouts-get'],
    queryFn: async () => await fetchWorkouts(),
  })

  const getWorkouts: StrapiReactQueryResponse = { data, error, isSuccess }

  useEffect(() => {
    if ((isErrorResponse(data) && Boolean(error)) || !isSuccess) {
      setWorkoutsQueryError(true)
      return
    }
    setWorkoutsQueryError(false)
    setWorkoutsData(data as [WorkoutDataResponse])
  }, [data, error, isSuccess])

  return [getWorkouts, workoutsData, workoutsQueryError]
}

export default useWorkoutQueries
