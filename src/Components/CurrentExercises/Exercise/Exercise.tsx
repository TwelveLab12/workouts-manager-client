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

import { isErrorResponse } from '../../../api/strapiTypeGuards'
import useExerciseQueryStatus from '../../../Hooks/useExerciseQueryStatus/useExerciseQueryStatus'
import useModal from '../../../Hooks/useModal/useModal'
import { deleteExercise as deleteExerciseQuery, updateExercise } from '../../../Queries/Exercise'
import {
    errorResponse,
    queryResponseOutput,
    QueryStatuses,
    successResponse,
} from '../../../Queries/QueryResponseBuilder'
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
    removeExercise,
    handleDuplicate,
    libraryExercises,
}: ExerciseCardProps): JSX.Element => {
    const [currentExercise, setCurrentExercise] = useState<ExerciseProps>(exercise)
    const [prevExercise, setPrevExercise] = useState<ExerciseProps>({ ...exercise })
    const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)
    const [fullscreen, setFullscreen] = useState<boolean>(false)

    const { open, handleClickOpen, handleClose } = useModal()
    const { dispatchFetchStatus, dispatchReleaseStatus, isFetching } = useExerciseQueryStatus()

    useEffect(() => {
        if (
            (prevExercise?.description !== currentExercise.description ||
                prevExercise?.label !== currentExercise.label ||
                prevExercise?.counter !== currentExercise.counter ||
                prevExercise?.repetition !== currentExercise.repetition ||
                prevExercise?.weight !== currentExercise.weight ||
                prevExercise?.rest !== currentExercise.rest) &&
            shouldUpdate
        ) {
            handleUpdate(currentExercise)
                .then((response) => {
                    if (response.status === QueryStatuses.SUCCESS) {
                        console.log({ response })
                        setPrevExercise({ ...currentExercise })
                    }
                })
                .finally(() => {
                    setShouldUpdate(false)
                })
        }
    }, [shouldUpdate])

    const toggleEditMode = (): void => {
        setCurrentExercise((exercisePrevState) => {
            return { ...exercisePrevState, editMode: !exercisePrevState.editMode }
        })
    }

    const incrementCounter = (): void => {
        setCurrentExercise((exercisePrevState) => {
            return { ...exercisePrevState, counter: ++exercisePrevState.counter }
        })
        setShouldUpdate(true)
    }

    const decrementCounter = (): void => {
        if (currentExercise.counter > 0) {
            setCurrentExercise((exercisePrevState) => {
                return { ...exercisePrevState, counter: --exercisePrevState.counter }
            })
            setShouldUpdate(true)
        }
    }

    const handleSave = (): void => {
        setShouldUpdate(true)
        toggleEditMode()
    }

    const handleUpdate = async (
        data: undefined | ExerciseProps = undefined,
    ): Promise<queryResponseOutput> => {
        dispatchFetchStatus()
        return await updateExercise(currentExercise.id, data ?? currentExercise)
            .then((response) => {
                if (isErrorResponse(response)) {
                    return errorResponse('Exercise update error', response)
                }
                return successResponse('Exercise update success', response)
            })
            .catch((error) => {
                return errorResponse('Exercise update error', error)
            })
            .finally(() => dispatchReleaseStatus())
    }

    const handleDelete = (): void => {
        if (!isFetching) {
            dispatchFetchStatus()
            deleteExerciseQuery(currentExercise.id)
                .then((response) => {
                    if (response?.data?.data?.id) {
                        removeExercise(response.data.data.id)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => dispatchReleaseStatus())
        }
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
                <IconButton
                    aria-label={'duplicate'}
                    size='small'
                    color='info'
                    onClick={!isFetching ? handleSave : undefined}
                >
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
