import type { ExerciseProps } from "../../../types/types"

interface useExerciseHeaderOutput {
    subheader: (currentExercise: ExerciseProps) => string
}

const useExerciseHeader = (): useExerciseHeaderOutput => {
    const subheader = (currentExercise: ExerciseProps): string => {
        if (currentExercise.editMode) {
            return ''
        }

        const currentRest = currentExercise.rest
        const times = {
            minutes: currentRest && currentRest > 0 ? Math.floor(currentRest / 60) : '',
            seconds: currentRest && currentRest > 0 && currentRest % 60 ? `'${currentRest % 60}` : '',
        }

        const subheaderParts = [
            currentExercise.repetition > 0 ? ` x${currentExercise.repetition} ` : '',
            currentExercise.weight > 0 ? `${currentExercise.weight} kg ` : '',
            currentExercise.rest > 0 ? `${times.minutes}${times.seconds} min` : '',
        ]
        return subheaderParts.filter((part) => part).join(' / ')
    }

    return { subheader }
}

export default useExerciseHeader