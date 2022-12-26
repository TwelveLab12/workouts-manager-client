import { Cancel, Edit, Save } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Dispatch, SetStateAction, useState } from 'react'

import { updateWorkout } from '../../../Queries/Workout'
import type { WorkoutProps } from '../../../types/types'
import CurrentWorkoutForm from '../CurrentWorkoutForm/CurrentWorkoutForm'

const initialData: WorkoutProps = { label: '', description: '' }

const CurrentWorkoutHeader = ({
    currentWorkout,
    setCurrentWorkout,
}: {
    currentWorkout: WorkoutProps | undefined
    setCurrentWorkout: Dispatch<SetStateAction<WorkoutProps | undefined>>
}): JSX.Element => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [data, setData] = useState<WorkoutProps>(currentWorkout ?? initialData)

    const toggleEditMode = (): void => {
        setEditMode((prevMode) => !prevMode)
    }

    const handleFormChange = (field: string, value: string): void => {
        setData((prevData) => {
            const newData: Record<string, string> = {}
            newData[field] = value
            return { ...prevData, ...newData }
        })
    }

    const onCancel = (): void => {
        setData(currentWorkout ?? initialData)
        toggleEditMode()
    }

    const onSave = (): void => {
        if (data.id) {
            updateWorkout(data.id, data)
                .then((success) => {
                    setCurrentWorkout(data)
                    console.info(success)
                })
                .catch((error) => {
                    console.error(error)
                })
                .finally(() => {
                    toggleEditMode()
                })
        }
    }

    return (
        <>
            <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                <Typography variant='h2' color='inherit' noWrap>
                    Workout of the day
                </Typography>
                {currentWorkout && editMode ? (
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
                )}
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
