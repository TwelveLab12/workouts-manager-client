import { Cancel, Delete, Edit, Favorite, FileCopy, Save } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import type { copyWorkoutToCurrentType } from '../../Hooks/useCurrentWorkout/useCurrentWorkout'
import useWorkoutForm from '../../Hooks/useWorkoutForm/useWorkoutForm'
import type { removeWorkoutType } from '../../Hooks/useWorkouts/useWorkouts'
import { appRoutes } from '../../routes/appRoutes'
import type { WorkoutProps } from '../../types/types'
import WorkoutForm from '../WorkoutForm/WorkoutForm'
import {
    WorkoutContainerStyled,
    WorkoutContentStyled,
    WorkoutHeaderActionsStyled,
    WorkoutHeaderDescriptionStyled,
    WorkoutHeaderLabelStyled,
    WorkoutHeaderLiteralsStyled,
    WorkoutHeaderStyled,
} from './Workout.style'
import Exercise from './WorkoutContent/Exercise/Exercise'
import ExercisesHeader from './WorkoutContent/ExercisesHeader/ExercisesHeader'

interface WorkoutComponentProps {
    copyWorkoutToCurrent: copyWorkoutToCurrentType
    workout: WorkoutProps
    removeWorkout: removeWorkoutType
    toggleFavoriteWorkout: (id: number) => void
}

const Workout = ({
    copyWorkoutToCurrent,
    workout,
    removeWorkout,
    toggleFavoriteWorkout,
}: WorkoutComponentProps): JSX.Element => {
    const { editMode, toggleEditMode, data, handleFormChange, onCancel, onSave } =
        useWorkoutForm(workout)

    const onDelete = (): void => {
        if (workout.id) {
            removeWorkout(workout.id)
        }
    }

    const onFavorite = (): void => {
        toggleFavoriteWorkout(workout?.id as number)
    }

    const navigate = useNavigate()
    const { home: homeRoute } = appRoutes
    const onCopy = useCallback(() => {
        copyWorkoutToCurrent(workout)
        navigate(homeRoute)
    }, [workout])

    return (
        <WorkoutContainerStyled maxWidth='md'>
            {editMode ? (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton color='error' size='small' onClick={onCancel}>
                            <Cancel />
                        </IconButton>
                        <IconButton size='small' color='primary' onClick={onSave}>
                            <Save />
                        </IconButton>
                    </Box>
                    <WorkoutForm handleFormChange={handleFormChange} data={data} />
                </>
            ) : (
                <WorkoutHeaderStyled>
                    <WorkoutHeaderLiteralsStyled>
                        <WorkoutHeaderLabelStyled>
                            {data.label}
                            <IconButton
                                size='small'
                                color={workout.isFavorite ? 'primary' : 'default'}
                                onClick={onFavorite}
                            >
                                <Favorite />
                            </IconButton>
                        </WorkoutHeaderLabelStyled>
                        <WorkoutHeaderDescriptionStyled>
                            {data.description}
                        </WorkoutHeaderDescriptionStyled>
                    </WorkoutHeaderLiteralsStyled>

                    <WorkoutHeaderActionsStyled>
                        <IconButton size='small' onClick={onCopy}>
                            <FileCopy />
                        </IconButton>
                        <IconButton size='small' onClick={toggleEditMode}>
                            <Edit />
                        </IconButton>
                        <IconButton size='small' onClick={onDelete}>
                            <Delete />
                        </IconButton>
                    </WorkoutHeaderActionsStyled>
                </WorkoutHeaderStyled>
            )}

            <WorkoutContentStyled>
                <Box>
                    <ExercisesHeader />
                </Box>
                {workout?.exercises?.length
                    ? workout?.exercises.map((exercise) => (
                          <Box key={`workout-exercise-${exercise.id}`}>
                              <Exercise exercise={exercise} />
                          </Box>
                      ))
                    : null}
            </WorkoutContentStyled>
        </WorkoutContainerStyled>
    )
}

export default Workout
