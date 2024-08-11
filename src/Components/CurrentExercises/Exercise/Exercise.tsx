import {
    Clear as ClearIcon,
    ContentCopy as ContentCopyIcon,
    Edit as EditIcon,
    Fullscreen as FullscreenIcon,
    FullscreenExit as FullscreenExitIcon,
    Info as InfoIcon,
    Save as SaveIcon,
} from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import useModal from '../../../Hooks/useModal/useModal'
import { theme } from '../../../theme/theme'
import type { DuplicatedExerciseProps, ExerciseProps } from '../../../types/types'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'
import CurrentExerciseCounter from '../CurrentExerciseCounter/CurrentExerciseCounter'
import CurrentExerciseForm from '../CurrentExerciseForm/CurrentExerciseForm'
import ExerciseHeader from '../ExerciseHeader/ExerciseHeader'
import ExerciseLayout from './Exercise.layout'
import type { ExerciseCardProps } from './Exercise.type'

const Exercise = ({
    exercise,
    updateExercise,
    removeExercise,
    handleDuplicate,
    libraryExercises,
}: ExerciseCardProps): JSX.Element => {
    const [currentExercise, setCurrentExercise] = useState<ExerciseProps>(exercise)
    const [fullscreen, setFullscreen] = useState<boolean>(false)
    const { open, handleClickOpen, handleClose } = useModal()

    useEffect(() => {
        updateExercise(currentExercise.id, currentExercise)
    }, [currentExercise])

    const toggleEditMode = (): void => {
        setCurrentExercise((exercisePrevState) => {
            return { ...exercisePrevState, editMode: !exercisePrevState.editMode }
        })
    }

    const incrementCounter = (): void => {
        setCurrentExercise((exercisePrevState) => {
            return { ...exercisePrevState, counter: ++exercisePrevState.counter }
        })
    }

    const decrementCounter = (): void => {
        if (currentExercise.counter > 0) {
            setCurrentExercise((exercisePrevState) => {
                return { ...exercisePrevState, counter: --exercisePrevState.counter }
            })
        }
    }

    const handleSave = (): void => {
        toggleEditMode()
    }

    const handleDelete = (): void => {
        removeExercise(currentExercise.id)
        handleClose()
    }

    const onDuplicate = (): void => {
        const { id, counter, editMode, ...dataToDuplicate } = currentExercise
        handleDuplicate(dataToDuplicate as DuplicatedExerciseProps)
    }

    const EditModeOffActions = (): JSX.Element => {
        return (
            <>
                <IconButton aria-label={'duplicate'} size='small' onClick={onDuplicate}>
                    <ContentCopyIcon />
                </IconButton>
                <IconButton aria-label={'edit'} size='small' onClick={toggleEditMode}>
                    <EditIcon />
                </IconButton>
            </>
        )
    }

    const EditModeOnActions = (): JSX.Element => {
        return (
            <>
                <IconButton aria-label={'duplicate'} size='small' color='info' onClick={handleSave}>
                    <SaveIcon />
                </IconButton>
            </>
        )
    }

    return (
        <>
            <ExerciseLayout
                fullscreen={fullscreen}
                editMode={currentExercise.editMode}
                header={
                    <ExerciseHeader
                        currentExercise={currentExercise}
                        action={
                            <>
                                <IconButton
                                    size='small'
                                    color='inherit'
                                    onClick={() => setFullscreen((prevState) => !prevState)}
                                >
                                    {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                                </IconButton>
                                <IconButton size='small' color='error' onClick={handleClickOpen}>
                                    <ClearIcon />
                                </IconButton>
                            </>
                        }
                    />
                }
                actions={!currentExercise.editMode ? <EditModeOffActions /> : <EditModeOnActions />}
            >
                <>
                    {!currentExercise.editMode ? (
                        <Stack
                            direction={'column'}
                            justifyContent='space-evenly'
                            sx={{
                                height: '100%',
                            }}
                        >
                            <CurrentExerciseCounter
                                currentExercise={currentExercise}
                                incrementCounter={incrementCounter}
                                decrementCounter={decrementCounter}
                            />
                            {currentExercise?.description ? (
                                <Box sx={{ px: 1, pt: 0, pb: 0, mb: 0 }}>
                                    <Typography
                                        variant={'caption'}
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            display: 'inline-flex',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                alignSelf: 'center',
                                                pr: 1,
                                            }}
                                        >
                                            <InfoIcon />
                                        </Box>
                                        {currentExercise.description}
                                    </Typography>
                                </Box>
                            ) : null}
                        </Stack>
                    ) : (
                        <CurrentExerciseForm
                            currentExercise={currentExercise}
                            setCurrentExercise={setCurrentExercise}
                            libraryExercises={libraryExercises}
                        />
                    )}
                </>
            </ExerciseLayout>
            <ConfirmDialog
                open={open}
                handleClose={handleClose}
                handleConfirmation={handleDelete}
                contentTitle={'Confirmation de la suppression'}
                contentText={
                    exercise.label
                        ? `Voulez vous supprimer l' exercice ${exercise.label}`
                        : `Voulez vous supprimer cet exercice`
                }
            />
        </>
    )
}

export default Exercise
