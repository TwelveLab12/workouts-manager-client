import { Alert, Container, Grid } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import useExercisesActions from '../../../Hooks/useAddExercises/useExercisesActions'
import { DuplicatedExerciseProps, ExerciseProps, LibraryExerciseProps } from '../../../types/types'
import Exercise from '../Exercise/Exercise'

interface ExercisesProps {
    exercises: ExerciseProps[]
    setExercises: Dispatch<SetStateAction<ExerciseProps[]>>
    libraryExercises: LibraryExerciseProps[] | undefined
}

const Exercises = ({ exercises, setExercises, libraryExercises }: ExercisesProps): JSX.Element => {
    const { duplicateExercise } = useExercisesActions()

    if (!exercises.length) {
        return (
            <Container sx={{ mt: 4, py: 2, mb: 4 }}>
                <Grid container spacing={1} rowSpacing={2} justifyContent={'center'}>
                    <Grid item>
                        <Alert variant='filled' severity='info'>
                            Add exercises to your workout
                        </Alert>
                    </Grid>
                </Grid>
            </Container>
        )
    }

    const removeExercise = (id: number): void => {
        setExercises((oldExercises) => {
            const newExercises = oldExercises.filter((exercise) => {
                return exercise.id !== id
            })
            return [...newExercises]
        })
    }

    const handleDuplicate = async (dataToDuplicate: DuplicatedExerciseProps): Promise<void> => {
        await duplicateExercise(dataToDuplicate).then(
            (duplicatedExercise: ExerciseProps | undefined) => {
                if (duplicatedExercise) {
                    setExercises(
                        (currentExercises: ExerciseProps[] | undefined): ExerciseProps[] => {
                            if (!currentExercises) {
                                return [duplicatedExercise]
                            }
                            return [...currentExercises, duplicatedExercise]
                        },
                    )
                }
            },
        )
    }

    return (
        <Container sx={{ mt: 4, py: 2, mb: 6 }}>
            <Grid container spacing={1} rowSpacing={2} justifyContent={'center'}>
                {exercises?.map((exercise) => (
                    <Exercise
                        key={exercise.id}
                        exercise={exercise}
                        libraryExercises={libraryExercises}
                        removeExercise={removeExercise}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        handleDuplicate={handleDuplicate}
                    />
                ))}
            </Grid>
        </Container>
    )
}

export default Exercises
