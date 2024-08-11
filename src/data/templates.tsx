import { ExerciseProps, WorkoutProps } from '../types/types'

export const newExerciseTemplate = (workout: WorkoutProps, id: number): ExerciseProps => ({
    counter: 0,
    workout,
    id,
    label: '',
    description: '',
    repetition: 0,
    weight: 0,
    rest: 0,
    editMode: false,
    createdAt: '',
    updatedAt: '',
})

export const newWorkoutTemplate = (
    id: number,
    label = 'new workout',
    description = '',
): WorkoutProps => ({
    id,
    label,
    description,
})
