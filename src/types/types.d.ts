export type DateTimeAttribute = Date | string

export interface InitialExerciseProps {
  id?: undefined
  label?: undefined
  description?: undefined
  counter?: undefined | number
  repetition?: number
  weight?: number
  rest?: number
  editMode?: boolean
  createdAt?: undefined
  updatedAt?: undefined
  workout?: WorkoutProps | number
  libraryExercise?: LibraryExerciseProps
}

export interface ExerciseProps {
  id: number
  label: string
  description: string
  counter: number
  repetition: number
  weight: number
  rest: number
  editMode: boolean
  createdAt: DateTimeAttribute
  updatedAt: DateTimeAttribute
  workout?: WorkoutProps
  libraryExercise?: LibraryExerciseProps
}


export interface DuplicatedExerciseProps extends Omit<ExerciseProps, 'id | counter | editMode'> { }

export interface WorkoutProps {
  id?: number
  label: string
  description: string
  createdAt?: DateTimeAttribute
  updatedAt?: DateTimeAttribute
}

export interface LibraryExerciseProps {
  id: number
  label: string
  description: string
  createdAt: DateTimeAttribute
  updatedAt: DateTimeAttribute
}
