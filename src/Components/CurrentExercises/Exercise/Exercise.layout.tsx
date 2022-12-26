import { Box, CardActions, CardContent, Grid } from '@mui/material'
import type { ReactNode } from 'react'

import { ExerciseCardStyled } from './Exercise.style'

const fullScreenSxStyle = {
    position: 'fixed',
    zIndex: 1299,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    maxWidth: '100%',
    padding: '0 !important',
}

const defaultSxStyle = {
    minWidth: 300,
}

const ExerciseLayout = (props: {
    fullscreen: boolean
    editMode: boolean
    header: ReactNode
    // content: ReactNode
    actions: ReactNode
    children: ReactNode
}): JSX.Element => {
    const {
        fullscreen = false,
        header,
        // content,
        actions,
        editMode,
        children,
    } = props
    return (
        <Grid item xs={8} sm={6} md={4} sx={!fullscreen ? defaultSxStyle : fullScreenSxStyle}>
            <ExerciseCardStyled>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>{header}</Box>
                <CardContent
                    sx={{
                        height: '100%',
                        px: 1,
                        pt: 2,
                        pb: 0,
                    }}
                >
                    {/* {content} */}
                    {children}
                </CardContent>
                <CardActions
                    sx={{
                        flex: '1',
                        display: 'flex',
                        justifyContent: !editMode ? 'space-between' : 'flex-end',
                    }}
                >
                    {' '}
                    {actions}{' '}
                </CardActions>
            </ExerciseCardStyled>
        </Grid>
    )
}

export default ExerciseLayout
