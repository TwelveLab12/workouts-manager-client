import type { UseQueryResult } from "@tanstack/react-query"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import type { DataResponse, LibraryExerciseDataResponse } from "../../api/strapi.types"
import { isErrorResponse } from "../../api/strapiTypeGuards"
import useLibraryExerciseQueries from '../../Hooks/reactQueries/useExerciseLibraryQueries'
import { useAppStatusContext } from "../../Providers/AppStatusProvider"
import type { LibraryExerciseProps } from "../../types/types"
import useAppLocalStorage from "../useAppLocalStorage/useAppLocalStorage"
import { currentWorkoutProps } from "../useCurrentWorkout/useCurrentWorkout"
import useFormatResponse from "../useFormatStrapiResponse/useFormatStrapiResponse"

interface useLibraryExercisesProps {
    currentWorkout: currentWorkoutProps | undefined
}

interface useLibraryExercisesOutput {
    libraryExercises: undefined | LibraryExerciseProps[]
    setLibraryExercises: Dispatch<SetStateAction<undefined | LibraryExerciseProps[]>>
}

const useLibraryExercises = (): useLibraryExercisesOutput => {
    const context = useAppStatusContext()
    const { isOnline } = context

    const { storedLibraryExercises, setStoredLibraryExercises } = useAppLocalStorage()


    const [libraryExercises, setLibraryExercises] = useState<undefined | LibraryExerciseProps[]>(
        undefined,
    )

    const { getLibraryExercises, libraryExercisesData, libraryExercisesQueryError } =
        useLibraryExerciseQueries()

    const { formatLibraryExerciseResponse } = useFormatResponse()

    useEffect(() => {
        if (!isOnline) {
            setLibraryExercises(storedLibraryExercises)
            return
        }

        if (
            (getLibraryExercises as UseQueryResult<DataResponse[]>)?.isSuccess ||
            !libraryExercisesQueryError ||
            !isErrorResponse(libraryExercisesData)
        ) {
            if (libraryExercisesData == null) {
                return
            }

            const mappedLibraryExercises = libraryExercisesData.map(
                (exercise: LibraryExerciseDataResponse): LibraryExerciseProps => {
                    return formatLibraryExerciseResponse(exercise)
                },
            )
            setLibraryExercises(() => mappedLibraryExercises ?? undefined)
        }
    }, [isOnline])

    useEffect(() => {
        if (libraryExercises) {
            setStoredLibraryExercises(libraryExercises)
        }
    }, [libraryExercises])

    return { libraryExercises, setLibraryExercises }
}
export default useLibraryExercises