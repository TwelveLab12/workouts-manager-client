import { Container, Typography } from '@mui/material'

import Workout from '../../Components/Workout/Workout'
import useCurrentWorkout from '../../Hooks/useCurrentWorkout/useCurrentWorkout'
import useWorkouts from '../../Hooks/useWorkouts/useWorkouts'
import type { WorkoutProps } from '../../types/types'

interface WorkoutsPageProps {
    onlyFavorites?: boolean
}
const Workouts = ({ onlyFavorites = false }: WorkoutsPageProps): JSX.Element => {
    const { currentWorkout, copyWorkoutToCurrent } = useCurrentWorkout()
    const { workouts, removeWorkout } = useWorkouts({ currentWorkout, onlyFavorites })

    return (
        <Container sx={{ pb: 6 }}>
            <Typography variant='h2' color='inherit' noWrap>
                Workouts History
            </Typography>
            {workouts?.length ? (
                <>
                    {workouts.map((workout: WorkoutProps) => {
                        return (
                            <Workout
                                key={`workout-${workout.id as number}`}
                                workout={workout}
                                copyWorkoutToCurrent={copyWorkoutToCurrent}
                                removeWorkout={removeWorkout}
                            />
                        )
                    })}
                </>
            ) : null}
        </Container>
    )
}

export default Workouts
