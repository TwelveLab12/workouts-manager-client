export type DateTimeAttribute = Date | string

export interface ExerciseProps {
    id: number,
    label: string,
    description: string,
    counter: number,
    createdAt: DateTimeAttribute,
    updatedAt: DateTimeAttribute,
    editMode: boolean
}