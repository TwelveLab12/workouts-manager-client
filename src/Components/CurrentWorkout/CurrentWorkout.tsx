import { Button } from '@mui/material'
import type { UseQueryResult } from '@tanstack/react-query/build/lib/types'
import { useEffect, useState } from 'react'

import type { DataResponse, LibraryExerciseDataResponse } from '../../api/strapi.types'
import { isErrorResponse } from '../../api/strapiTypeGuards'
import CurrentExercisesComponent from '../../Components/CurrentExercises/Exercises/Exercises'
import CurrentWorkoutHeader from '../../Components/CurrentWorkoutHeader/CurrentWorkoutHeader'
import useLibraryExerciseQueries from '../../Hooks/reactQueries/useExerciseLibraryQueries'
import useExercisesActions from '../../Hooks/useAddExercises/useExercisesActions'
import useCurrentWorkout from '../../Hooks/useCurrentWorkout/useCurrentWorkout'
import useExercises from '../../Hooks/useExercises/useExercises'
import useFormatResponse from '../../Hooks/useFormatStrapiResponse/useFormatStrapiResponse'
import { useAppStatusContext } from '../../Providers/AppStatusProvider'
import type { ExerciseProps, LibraryExerciseProps } from '../../types/types'
import CurrentWorkoutToolbar from '../Toolbars/CurrentWorkoutToolbar/CurrentWorkoutToolbar'

const CurrentWorkout = ({
    currentToolbarRef,
}: {
    currentToolbarRef: HTMLDivElement | undefined
}): JSX.Element => {
    const { getLibraryExercises, libraryExercisesData, libraryExercisesQueryError } =
        useLibraryExerciseQueries()

    const { formatLibraryExerciseResponse } = useFormatResponse()
    const context = useAppStatusContext()
    const { isOnline } = context

    const { initWorkout, currentWorkout, setCurrentWorkout, storeToHistory } = useCurrentWorkout()

    const { exercises, setExercises } = useExercises({ workout: currentWorkout ?? undefined })

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
            if (isOnline) {
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
            } else {
                setExercises((current) => {
                    console.log(current, currentWorkout)

                    const newExercise: ExerciseProps = {
                        counter: 0,
                        workout: currentWorkout,
                        id: 0,
                        label: '',
                        description: '',
                        repetition: 0,
                        weight: 0,
                        rest: 0,
                        editMode: false,
                        createdAt: '',
                        updatedAt: '',
                    }
                    return [...current, newExercise]
                })
            }
        }
    }

    return (
        <>
            {currentToolbarRef ? (
                <CurrentWorkoutToolbar
                    currentToolbarRef={currentToolbarRef}
                    storeToHistory={storeToHistory}
                    handleAddExercise={handleAddExercise}
                />
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
