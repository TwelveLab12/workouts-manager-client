import { Button } from '@mui/material'

import CurrentExercisesComponent from '../../Components/CurrentExercises/Exercises/Exercises'
import CurrentWorkoutHeader from '../../Components/CurrentWorkoutHeader/CurrentWorkoutHeader'
import { newExerciseTemplate } from '../../data/templates'
import useCurrentWorkout from '../../Hooks/useCurrentWorkout/useCurrentWorkout'
import useExercises from '../../Hooks/useExercises/useExercises'
import useLibraryExercises from '../../Hooks/useLibraryExercises/useLibraryExercises'
import type { ExerciseProps } from '../../types/types'
import CurrentWorkoutToolbar from '../Toolbars/CurrentWorkoutToolbar/CurrentWorkoutToolbar'

const CurrentWorkout = ({
    currentToolbarRef,
}: {
    currentToolbarRef: HTMLDivElement | undefined
}): JSX.Element => {
    const { initWorkout, currentWorkout, setCurrentWorkout, storeToHistory } = useCurrentWorkout()

    const { libraryExercises } = useLibraryExercises()
    const { exercises, setExercises } = useExercises({ workout: currentWorkout ?? undefined })

    const handleAddExercise = (): void => {
        if (currentWorkout) {
            setExercises((current) => {
                const maxIdValue = Math.max.apply(
                    null,
                    current.map((exercise) => exercise.id),
                )
                const newExercise: ExerciseProps = newExerciseTemplate(
                    currentWorkout,
                    (maxIdValue === -Infinity ? 0 : maxIdValue) + 1,
                )
                return [...current, newExercise]
            })
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
