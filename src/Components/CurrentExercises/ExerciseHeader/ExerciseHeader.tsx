import { ExerciseHeaderStyled } from './ExerciseHeader.style'
import { ExerciseHeaderProps } from './ExerciseHeader.type'
import useExerciseHeader from './useExerciseHeader'

const ExerciseHeader = ({ currentExercise, action }: ExerciseHeaderProps): JSX.Element => {
    const { subheader } = useExerciseHeader()
    return (
        <ExerciseHeaderStyled
            title={currentExercise.label}
            subheader={subheader(currentExercise)}
            action={action}
        />
    )
}

export default ExerciseHeader
