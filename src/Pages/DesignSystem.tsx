import CurrentExerciseCounter from "../Components/CurrentExercises/CurrentExerciseCounter/CurrentExerciseCounter";
import Exercise from "../Components/CurrentExercises/Exercise/Exercise";
import {DateTimeAttribute, ExerciseProps} from "../types/types";


const currentExercise = {
    id: 1,
    label: 'exercise',
    description: 'string',
    counter: 0,
    repetition: 0,
    weight: 0,
    rest: 0,
    editMode: false,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString()
}
const DesignSystem = (): JSX.Element => {


    const incrementCounter = () => {
    }
    const decrementCounter = () => {
    }
    return (
        <>
            <CurrentExerciseCounter
                currentExercise={currentExercise}
                incrementCounter={incrementCounter}
                decrementCounter={decrementCounter}
            />
        </>
    )
}

export default DesignSystem