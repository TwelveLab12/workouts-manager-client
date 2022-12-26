import { Dispatch, SetStateAction } from "react";

import { ExerciseProps, LibraryExerciseProps } from "../../../types/types";

export interface CurrentExerciseFormProps {
  currentExercise: ExerciseProps
  setCurrentExercise: Dispatch<SetStateAction<ExerciseProps>>
  libraryExercises: LibraryExerciseProps[] | undefined
}

export type HandleFormChangeDataProps = Record<string, string | number | LibraryExerciseProps | null>
