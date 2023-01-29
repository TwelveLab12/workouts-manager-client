import { Cancel, Edit, Save } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect } from 'react'

import type {
    currentWorkoutProps,
    setCurrentWorkoutProps,
} from '../../Hooks/useCurrentWorkout/useCurrentWorkout'
import useWorkoutForm from '../../Hooks/useWorkoutForm/useWorkoutForm'
import type { WorkoutProps } from '../../types/types'
import CurrentWorkoutForm from '../WorkoutForm/WorkoutForm'

interface CurrentWorkoutHeaderOutput {
    currentWorkout: currentWorkoutProps
    setCurrentWorkout: setCurrentWorkoutProps
}

const CurrentWorkoutHeader = ({
    currentWorkout,
    setCurrentWorkout,
}: CurrentWorkoutHeaderOutput): JSX.Element => {
    const { editMode, toggleEditMode, data, handleFormChange, onCancel, onSave } = useWorkoutForm(
        currentWorkout as WorkoutProps,
    )

    useEffect(() => {
        setCurrentWorkout(data)
    }, [data])

    return (
        <>
            <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                <Typography variant='h2' color='inherit' noWrap>
                    Workout of the day
                </Typography>
                {currentWorkout?.id ? (
                    editMode ? (
                        <Box>
                            <Button onClick={onCancel} startIcon={<Cancel />} color={'error'}>
                                Annuler
                            </Button>
                            <Button onClick={onSave} startIcon={<Save />}>
                                Sauvegarder
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            onClick={toggleEditMode}
                            startIcon={<Edit />}
                            color={'inherit'}
                            variant={'contained'}
                        >
                            Modifier
                        </Button>
                    )
                ) : null}
            </Stack>
            {currentWorkout && !editMode ? (
                <Stack
                    direction={'row'}
                    spacing={2}
                    py={2}
                    sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}
                >
                    <Typography variant='subtitle1' color='inherit' noWrap>
                        {currentWorkout?.label ?? null}
                    </Typography>
                    <Typography variant='body1' color='inherit' noWrap>
                        {currentWorkout?.description ?? null}
                    </Typography>
                </Stack>
            ) : null}

            {currentWorkout && editMode ? (
                <CurrentWorkoutForm handleFormChange={handleFormChange} data={data} />
            ) : null}
        </>
    )
}

export default CurrentWorkoutHeader
