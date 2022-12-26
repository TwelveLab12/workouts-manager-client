import {
    Autocomplete,
    Box,
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material'
import React, { useCallback } from "react";

import { theme } from "../../../theme/theme";
import { ExerciseProps, LibraryExerciseProps } from "../../../types/types";
import { CurrentExerciseFormProps, HandleFormChangeDataProps } from "./CurrentExerciseForm.types";

const CurrentExerciseForm = ({
    currentExercise,
    setCurrentExercise,
    libraryExercises,
}: CurrentExerciseFormProps): JSX.Element => {
    const handleFormChange = (data: HandleFormChangeDataProps): void => {
        setCurrentExercise((exercisePrevState: ExerciseProps) => {
            return { ...exercisePrevState, ...data }
        })
    }

    const handleLabelChange = (value: string): void => {
        let data: {
            label: string
            description?: string
            libraryExercise?: LibraryExerciseProps | null
        } = {
            label: value,
            libraryExercise: null,
        }
        if (libraryExercises) {
            const isFound = libraryExercises.find((ex) => ex.label === value)
            if (isFound) {
                data = { ...data, description: isFound.description, libraryExercise: isFound }
            }
        }

        handleFormChange(data)
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        handleFormChange({ description: e.target.value })
    }

    const handleRepetitionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        handleFormChange({ repetition: Number(e.target.value) })
    }

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        handleFormChange({ weight: Number(e.target.value) })
    }

    const handleMinutesRestChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        handleTimeChange(e.target.value, getSeconds())
    }

    const handleSecondsRestChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        handleTimeChange(getMinutes(), e.target.value)
    }

    const handleTimeChange = (newMinutes: string, newSeconds: string): void => {
        const seconds = Number(newSeconds)
        const minutes = Number(newMinutes)
        const time = minutes * 60 + seconds
        handleFormChange({ rest: Number(`${time}`) })
    }

    const getMinutes = (): string => {
        return getTimes()[0]
    }

    const getSeconds = (): string => {
        return getTimes()[1]
    }

    const getTimes = useCallback((): [string, string] => {
        const rest: number | undefined = currentExercise.rest // in seconds
        if (!rest || isNaN(rest)) {
            return ['00', '00']
        }

        const minutes = String(Math.floor(rest / 60))
        const seconds = rest % 60

        return [
            minutes ? minutes.padStart(2, '0') : '00',
            seconds ? String(seconds).padStart(2, '0') : '00',
        ]
    }, [currentExercise.rest])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > :not(style)': { m: 1, flex: '1 1 100%', width: '100%' },
            }}
        >
            <div>
                {libraryExercises ? (
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                        <Select
                            id='select'
                            label={'type'}
                            value={currentExercise?.libraryExercise?.id ?? ''}
                            inputProps={{ readOnly: true }}
                            variant={'filled'}
                            displayEmpty={true}
                            size={'small'}
                            sx={{ fontSize: 14, color: theme.palette.text.secondary }}
                        >
                            {libraryExercises?.map((libraryExercise) => {
                                return (
                                    <MenuItem key={libraryExercise.id} value={libraryExercise.id}>
                                        {libraryExercise.label}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                ) : null}
            </div>

            <Autocomplete
                disablePortal
                freeSolo={true}
                id='label'
                options={(libraryExercises as []) ?? []}
                getOptionLabel={(option: string | LibraryExerciseProps) => {
                    if (typeof option === 'string') {
                        return option
                    }
                    return option?.label ?? ''
                }}
                sx={{ width: 300 }}
                value={currentExercise as LibraryExerciseProps}
                onInputChange={(event, newInputValue) => {
                    if (event) {
                        handleLabelChange(newInputValue)
                    }
                }}
                renderInput={(params) => <TextField {...params} label='Label' />}
            />

            <TextField
                variant='outlined'
                id='description'
                value={currentExercise.description}
                label='Description'
                onChange={handleDescriptionChange}
            />

            <FormGroup
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    '& .MuiFormControl-root': { m: '1rem 0.1rem 0', width: '80px' },
                }}
            >
                <FormControl>
                    <InputLabel htmlFor='repetition'>Reps</InputLabel>
                    <OutlinedInput
                        type='number'
                        id='repetition'
                        defaultValue={currentExercise.repetition}
                        label='Reps'
                        onChange={handleRepetitionChange}
                        size='small'
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor='weight'>Poids</InputLabel>
                    <OutlinedInput
                        type='number'
                        id='weight'
                        defaultValue={currentExercise.weight}
                        label='weight'
                        onChange={handleWeightChange}
                        size='small'
                    />
                </FormControl>
            </FormGroup>
            <Box sx={{ textAlign: 'center ' }}>
                <InputLabel>Repos</InputLabel>
            </Box>
            <FormGroup
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    '& .MuiFormControl-root': {
                        m: '0 0.1rem',
                        width: 80,
                        textAlign: 'right',
                    },
                    '& .MuiInputBase-input': {
                        textAlign: 'center',
                    },
                }}
            >
                <FormControl>
                    <InputLabel htmlFor='rest'>minutes</InputLabel>
                    <OutlinedInput
                        type='number'
                        id='rest'
                        value={getMinutes()}
                        label='rest'
                        onChange={handleMinutesRestChange}
                        size='small'
                        inputProps={{ min: 0 }}
                    />
                </FormControl>
                <Box sx={{ px: 0.2, py: 1 }}> : </Box>
                <FormControl>
                    <InputLabel htmlFor='rest'>seconds</InputLabel>
                    <OutlinedInput
                        type='number'
                        id='rest'
                        value={getSeconds()}
                        label='rest'
                        onChange={handleSecondsRestChange}
                        size='small'
                        inputProps={{ min: 0, max: 59 }}
                    />
                </FormControl>
            </FormGroup>
        </Box>
    )
}

export default CurrentExerciseForm
