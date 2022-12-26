import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ExerciseDataResponse } from "../../api/strapi.types";
import { isErrorResponse } from "../../api/strapiTypeGuards";
import { fetchLibraryExercises } from "../../Queries/ExerciseLibrary";
import { StrapiReactQueryResponse } from "./reactQueries.types";

interface useExerciseLibraryQueriesOutput {
  getLibraryExercises: StrapiReactQueryResponse,
  libraryExercisesData: undefined | ExerciseDataResponse[],
  libraryExercisesQueryError: boolean,
}

const useExerciseLibraryQueries = (): useExerciseLibraryQueriesOutput => {
  const { data, error, isSuccess } = useQuery({
    queryKey: ['library-exercises-get'],
    queryFn: async () => await fetchLibraryExercises(),
  })

  const [libraryExercisesData, setLibraryExercisesData] = useState<undefined | ExerciseDataResponse[]>(undefined)
  const [libraryExercisesQueryError, setLibraryExercisesQueryError] = useState<boolean>(false)
  const getLibraryExercises: StrapiReactQueryResponse = { data, error, isSuccess }

  useEffect(() => {
    if ((isErrorResponse(data) && Boolean(error)) || !isSuccess) {
      setLibraryExercisesQueryError(true)
      return
    }
    setLibraryExercisesQueryError(false)
    setLibraryExercisesData(data as [ExerciseDataResponse])
  }, [data, error, isSuccess])

  return { getLibraryExercises, libraryExercisesData, libraryExercisesQueryError }
}

export default useExerciseLibraryQueries
