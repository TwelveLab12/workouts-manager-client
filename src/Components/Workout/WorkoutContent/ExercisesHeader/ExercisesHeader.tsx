import {
    WorkoutExerciseCellCounter,
    WorkoutExerciseCellLabel,
    WorkoutExerciseCellShort,
    WorkoutExerciseRowHeader,
} from '../WorkoutContent.style'

const ExercisesHeader = (): JSX.Element => {
    return (
        <WorkoutExerciseRowHeader>
            <WorkoutExerciseCellLabel>
                <span>Libellé / Description</span>
            </WorkoutExerciseCellLabel>
            <WorkoutExerciseCellCounter>
                <span>Séries</span>
            </WorkoutExerciseCellCounter>
            <WorkoutExerciseCellShort>
                <span>Kg</span>
            </WorkoutExerciseCellShort>
            <WorkoutExerciseCellShort>
                <span>Reps</span>
            </WorkoutExerciseCellShort>
            <WorkoutExerciseCellShort>
                <span>Repos</span>
            </WorkoutExerciseCellShort>
        </WorkoutExerciseRowHeader>
    )
}

export default ExercisesHeader
