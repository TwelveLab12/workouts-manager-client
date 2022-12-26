import type { ExerciseProps } from "../../../types/types"
export interface ExerciseCardProps {
    exercise: ExerciseProps
    removeExercise: (id: number) => void
    handleDuplicate: (dataToDuplicate: DuplicatedExerciseProps) => void
    libraryExercises: LibraryExerciseProps[] | undefined
}
