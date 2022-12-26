import { Box } from '@mui/material'

import AddButton from './AddButton'
import { CounterStyled, ExerciseCounterStyled } from './CurrentExerciseCounter.styles'
import { CurrentExerciseCounterProps } from './CurrentExerciseCounter.types'
import RemoveButton from './RemoveButton'

const CurrentExerciseCounter = ({
    currentExercise,
    incrementCounter,
    decrementCounter,
}: CurrentExerciseCounterProps): JSX.Element => {
    return (
        <ExerciseCounterStyled direction='row' spacing={3}>
            <Box>
                <RemoveButton onClick={decrementCounter} />
            </Box>
            <CounterStyled> {currentExercise.counter}</CounterStyled>
            <Box>
                <AddButton onClick={incrementCounter} />
            </Box>
        </ExerciseCounterStyled>
    )
}

export default CurrentExerciseCounter
