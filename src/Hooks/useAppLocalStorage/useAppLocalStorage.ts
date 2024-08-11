import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'

import type { ExerciseProps, LibraryExerciseProps } from '../../types/types'
import { WorkoutProps } from '../../types/types'
import useLocalStorage from '../useLocalStorage/useLocalStorage'

interface appLocalStorageKeysProps {
    CURRENT_EXERCISES: string
    CURRENT_WORKOUT: string
    LIBRARY_EXERCISES: string
    WORKOUTS: string
}

interface useAppLocalStorageOutput {
    appLocalStorageKeys: appLocalStorageKeysProps
    currentWorkoutStored: WorkoutProps | null
    setCurrentWorkoutStored: Dispatch<SetStateAction<WorkoutProps | null>>
    storedExercises: ExerciseProps[]
    setStoredExercises: Dispatch<SetStateAction<ExerciseProps[]>>
    storedLibraryExercises: LibraryExerciseProps[]
    setStoredLibraryExercises: Dispatch<SetStateAction<LibraryExerciseProps[]>>
    workoutsStored: WorkoutProps[]
    setWorkoutsStored: Dispatch<SetStateAction<WorkoutProps[]>>
}

const useAppLocalStorage = (): useAppLocalStorageOutput => {
    const appLocalStorageKeys: appLocalStorageKeysProps = useMemo(
        () => ({
            CURRENT_EXERCISES: 'current-exercises',
            CURRENT_WORKOUT: 'current-workout',
            LIBRARY_EXERCISES: 'library-exercises',
            WORKOUTS: 'workouts',
        }),
        [],
    )

    const [storedExercises, setStoredExercises] = useLocalStorage<ExerciseProps[]>(
        appLocalStorageKeys.CURRENT_EXERCISES,
        [],
    )
    const [storedLibraryExercises, setStoredLibraryExercises] = useLocalStorage<
        LibraryExerciseProps[]
    >(appLocalStorageKeys.LIBRARY_EXERCISES, [])

    const [currentWorkoutStored, setCurrentWorkoutStored] = useLocalStorage<null | WorkoutProps>(
        appLocalStorageKeys.CURRENT_WORKOUT,
        null,
    )
    const [workoutsStored, setWorkoutsStored] = useLocalStorage<WorkoutProps[]>(
        appLocalStorageKeys.WORKOUTS,
        [],
    )

    return {
        appLocalStorageKeys,
        currentWorkoutStored,
        setCurrentWorkoutStored,
        storedExercises,
        setStoredExercises,
        storedLibraryExercises,
        setStoredLibraryExercises,
        workoutsStored,
        setWorkoutsStored,
    }
}

export default useAppLocalStorage
