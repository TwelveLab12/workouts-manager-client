import { Box } from '@mui/material'

import type { ExerciseProps } from '../../../../types/types'
import {
    Description,
    EvenWorkoutExercise,
    OddWorkoutExercise,
    WorkoutExerciseCellCounter,
    WorkoutExerciseCellLabel,
    WorkoutExerciseCellShort,
    WorkoutExerciseContainer,
    WorkoutExerciseRow,
} from '../WorkoutContent.style'

interface WorkoutExerciseProps {
    exercise: ExerciseProps
}

const Exercise = ({ exercise }: WorkoutExerciseProps): JSX.Element => {
    return (
        <WorkoutExerciseContainer>
            {exercise.id % 2 !== 0 ? (
                <OddWorkoutExercise>
                    <Row exercise={exercise} />
                </OddWorkoutExercise>
            ) : (
                <EvenWorkoutExercise>
                    <Row exercise={exercise} />
                </EvenWorkoutExercise>
            )}
        </WorkoutExerciseContainer>
    )
}

const Row = ({ exercise }: { exercise: ExerciseProps }): JSX.Element => {
    return (
        <WorkoutExerciseRow>
            <WorkoutExerciseCellLabel>
                <Box>{exercise?.label}</Box>
                <Description>{exercise?.description}</Description>
            </WorkoutExerciseCellLabel>
            <WorkoutExerciseCellCounter>
                <span className='badge badge-counter'>{exercise?.counter}</span>
            </WorkoutExerciseCellCounter>
            <WorkoutExerciseCellShort>
                <span>{exercise?.weight}</span>
            </WorkoutExerciseCellShort>
            <WorkoutExerciseCellShort>
                <span>{exercise?.repetition}</span>
            </WorkoutExerciseCellShort>
            <WorkoutExerciseCellShort>
                <span>{exercise?.rest}</span>
            </WorkoutExerciseCellShort>
        </WorkoutExerciseRow>
    )
}

export default Exercise
