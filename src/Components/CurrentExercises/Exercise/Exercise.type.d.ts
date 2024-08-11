import type { ExerciseProps } from '../../../types/types'
export interface ExerciseCardProps {
    exercise: ExerciseProps
    updateExercise: (id: number, data: ExerciseProps) => void
    removeExercise: (id: number) => void
    handleDuplicate: (dataToDuplicate: DuplicatedExerciseProps) => void
    libraryExercises: LibraryExerciseProps[] | undefined
}
