import { Cancel, Delete, Edit, Favorite, FileCopy, Save } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useState } from 'react'

import type { StrapiResponse, WorkoutDataResponse } from '../../api/strapi.types'
import type { copyWorkoutToCurrentType } from '../../Hooks/useCurrentWorkout/useCurrentWorkout'
import useExercises from '../../Hooks/useExercises/useExercises'
import useWorkoutForm from '../../Hooks/useWorkoutForm/useWorkoutForm'
import type { removeWorkoutType } from '../../Hooks/useWorkouts/useWorkouts'
import { deleteWorkout, putWorkout } from '../../Queries/workoutQueries'
import type { FavoriteWorkoutProps, WorkoutProps } from '../../types/types'
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
}

const Workout = ({
    copyWorkoutToCurrent,
    workout,
    removeWorkout,
}: WorkoutComponentProps): JSX.Element => {
    const [isWorkoutFavorite, setisWorkoutFavorite] = useState<boolean>(workout.isFavorite ?? false)
    const { editMode, toggleEditMode, data, handleFormChange, onCancel, onSave } =
        useWorkoutForm(workout)
    const { exercises } = useExercises({ workout })

    const onDelete = (): void => {
        const deleteWorkoutPromise = async (
            workoutId: number,
        ): Promise<WorkoutDataResponse | undefined> => {
            const response = await deleteWorkout(workoutId)

            if ((response as StrapiResponse)?.data?.data) {
                return (response as StrapiResponse)?.data?.data as WorkoutDataResponse
            }
            return undefined
        }

        if (workout.id) {
            deleteWorkoutPromise(workout.id).then(() => {
                if (workout.id) {
                    removeWorkout(workout.id)
                }
            })
        }
    }

    const onFavorite = (): void => {
        if (workout.id) {
            const updateFavoriteData: FavoriteWorkoutProps = {
                id: workout.id,
                isFavorite: !isWorkoutFavorite,
            }
            putWorkout(workout.id, updateFavoriteData).then(() => {
                setisWorkoutFavorite(updateFavoriteData.isFavorite)
            })
        }
    }

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
                                color={isWorkoutFavorite ? 'primary' : 'default'}
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
                        <IconButton
                            size='small'
                            onClick={() => copyWorkoutToCurrent(workout, exercises)}
                        >
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
                {exercises?.length
                    ? exercises.map((exercise) => (
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
