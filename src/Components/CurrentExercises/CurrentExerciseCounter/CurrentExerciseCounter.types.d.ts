import {ExerciseProps} from "../../../types/types";

export interface CurrentExerciseCounterProps {
  currentExercise: ExerciseProps
  incrementCounter: MouseEventHandler<HTMLButtonElement>
  decrementCounter: MouseEventHandler<HTMLButtonElement>
}

export interface CounterButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export interface RemoveButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}