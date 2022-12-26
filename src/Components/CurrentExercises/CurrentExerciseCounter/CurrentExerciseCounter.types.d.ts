export interface CurrentExerciseCounterProps {
  currentExercise: ExerciseProps
  incrementCounter: MouseEventHandler<HTMLButtonElement>
  decrementCounter: MouseEventHandler<HTMLButtonElement>
}

export interface CounterButtonProps {
  onClick: () => void
}

export interface RemoveButtonProps {
  onClick: () => void
}