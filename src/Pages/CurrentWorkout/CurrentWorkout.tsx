import { Add } from '@mui/icons-material'
import { Button, Portal } from '@mui/material'
import type { UseQueryResult } from '@tanstack/react-query/build/lib/types'
import { MutableRefObject, useEffect, useState } from 'react'

import type { DataResponse, LibraryExerciseDataResponse } from '../../api/strapi.types'
import { isErrorResponse } from '../../api/strapiTypeGuards'
import CurrentExercisesComponent from '../../Components/CurrentExercises/Exercises/Exercises'
import CurrentWorkoutHeader from '../../Components/CurrentWorkout/CurrentWorkoutHeader/CurrentWorkoutHeader'
import { AddExerciseFabStyled } from '../../Components/Toolbars/CurrentWorkoutToolbar/CurrentWorkoutToolbar.styles'
import useLibraryExerciseQueries from '../../Hooks/reactQueries/useExerciseLibraryQueries'
import useExercisesActions from '../../Hooks/useAddExercises/useExercisesActions'
import useCurrentWorkout from '../../Hooks/useCurrentWorkout/useCurrentWorkout'
import useExercises from '../../Hooks/useExercises/useExercises'
import useFormatResponse from '../../Hooks/useFormatStrapiResponse/useFormatStrapiResponse'
import type { ExerciseProps, LibraryExerciseProps } from '../../types/types'

const CurrentWorkout = (toolbarRef: {
    toolbarRef: MutableRefObject<HTMLDivElement | undefined> | undefined
}): JSX.Element => {
    const { getLibraryExercises, libraryExercisesData, libraryExercisesQueryError } =
        useLibraryExerciseQueries()
    const { formatLibraryExerciseResponse } = useFormatResponse()
    const { initWorkout, currentWorkout, setCurrentWorkout } = useCurrentWorkout()
    const { exercises, setExercises } = useExercises({ workout: currentWorkout })

    const { addExercise } = useExercisesActions()

    const [libraryExercises, setLibraryExercises] = useState<undefined | LibraryExerciseProps[]>(
        undefined,
    )

    useEffect(() => {
        // Library Exercise
        if (
            (getLibraryExercises as UseQueryResult<[DataResponse]>)?.isSuccess ||
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
    }, [currentWorkout])

    const handleAddExercise = (): void => {
        if (currentWorkout) {
            const addExercisePromise = async (): Promise<void> => {
                await addExercise(currentWorkout).then(
                    (createdExercise: ExerciseProps | undefined) => {
                        if (createdExercise) {
                            setExercises(
                                (
                                    currentExercises: ExerciseProps[] | undefined,
                                ): ExerciseProps[] => {
                                    if (!currentExercises) {
                                        return [createdExercise]
                                    }
                                    return [...currentExercises, createdExercise]
                                },
                            )
                        }
                    },
                )
            }
            addExercisePromise()
        }
    }

    return (
        <>
            {toolbarRef?.toolbarRef?.current ? (
                <Portal container={toolbarRef?.toolbarRef?.current}>
                    <AddExerciseFabStyled onClick={handleAddExercise}>
                        <Add />
                    </AddExerciseFabStyled>
                </Portal>
            ) : null}

            <CurrentWorkoutHeader
                currentWorkout={currentWorkout}
                setCurrentWorkout={setCurrentWorkout}
            />

            {!currentWorkout?.id || (currentWorkout.id && isNaN(currentWorkout?.id)) ? (
                <Button onClick={initWorkout}> Add Workout </Button>
            ) : (
                <CurrentExercisesComponent
                    exercises={exercises}
                    setExercises={setExercises}
                    libraryExercises={libraryExercises}
                />
            )}
        </>
    )
}

export default CurrentWorkout
