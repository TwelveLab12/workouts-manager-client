import { Box, Container, Typography } from '@mui/material'
import { useCallback } from 'react'

import Workout from '../../Components/Workout/Workout'
import useCurrentWorkout from '../../Hooks/useCurrentWorkout/useCurrentWorkout'
import useWorkouts from '../../Hooks/useWorkouts/useWorkouts'
import type { WorkoutProps } from '../../types/types'

interface WorkoutsPageProps {
    onlyFavorites?: boolean
}
const Workouts = ({ onlyFavorites = false }: WorkoutsPageProps): JSX.Element => {
    const { copyWorkoutToCurrent } = useCurrentWorkout()
    const { workouts, setWorkoutsStored, removeWorkout } = useWorkouts({
        onlyFavorites,
    })

    const toggleFavoriteWorkout = useCallback(
        (workoutId: number) => {
            const found = workouts.find((workoutItem) => {
                return workoutItem.id === workoutId
            })
            if (!found) {
                return
            }
            found.isFavorite = found?.isFavorite ? !found?.isFavorite : true

            setWorkoutsStored((current) => {
                return current.map((workoutItem) => {
                    if (workoutItem.id === found?.id) {
                        return found
                    }
                    return workoutItem
                })
            })
        },
        [workouts],
    )

    return (
        <Container sx={{ pb: 6 }}>
            <Typography variant='h2' color='inherit' noWrap>
                Workouts History
            </Typography>
            {workouts?.length ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        paddingTop: '2rem',
                    }}
                >
                    {workouts.map((workout: WorkoutProps) => {
                        return (
                            <Workout
                                key={`workout-${workout.id as number}`}
                                workout={workout}
                                copyWorkoutToCurrent={copyWorkoutToCurrent}
                                removeWorkout={removeWorkout}
                                toggleFavoriteWorkout={toggleFavoriteWorkout}
                            />
                        )
                    })}
                </Box>
            ) : null}
        </Container>
    )
}

export default Workouts
