import { Box, Stack, TextField } from '@mui/material'

import type { WorkoutProps } from '../../../types/types'

const CurrentWorkoutForm = ({
    data,
    handleFormChange,
}: {
    data: WorkoutProps
    handleFormChange: (field: string, value: string) => void
}): JSX.Element => {
    const { label, description } = data
    return (
        <Box component={'form'}>
            <Stack direction={'column'} spacing={2}>
                <TextField
                    label='Label'
                    value={label ?? ''}
                    variant='standard'
                    fullWidth
                    onChange={(event) => {
                        handleFormChange('label', event.target.value)
                    }}
                />
                <TextField
                    label='Description'
                    value={description ?? ''}
                    fullWidth
                    onChange={(event) => {
                        handleFormChange('description', event.target.value)
                    }}
                    variant='standard'
                />
            </Stack>
        </Box>
    )
}

export default CurrentWorkoutForm
