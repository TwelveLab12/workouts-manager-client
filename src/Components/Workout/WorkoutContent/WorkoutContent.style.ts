
import { Box, styled, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";


const BoxEllipsis = styled(Box)(() => {
    return {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        '> span': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    }
})


export const WorkoutExerciseContainer = styled(Box)(() => {
    return {}
})

export const BaseWorkoutExercise = styled(Box)(() => {
    return { minWidth: '260px', }
})

export const OddWorkoutExercise = styled(BaseWorkoutExercise)(({ theme }) => {
    const { palette } = theme
    return {

        backgroundColor: `${palette.grey[100]}`
    }
})

export const EvenWorkoutExercise = styled(BaseWorkoutExercise)(({ theme }) => {

    return {
    }
})

export const WorkoutExerciseRow = styled(Box)(({ theme }) => {
    const { spacing, breakpoints } = theme

    return {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',

        '> *': {
            paddingTop: spacing(1),
            paddingBottom: spacing(1),
            paddingRight: spacing(0.5),
            paddingLeft: spacing(0.5),
        },
        [breakpoints.down('sm')]: {
            justifyContent: 'space-around'
        },
    }
})

export const WorkoutExerciseRowHeader = styled(WorkoutExerciseRow)(({ theme }) => {
    const { palette, spacing } = theme

    return {
        paddingBottom: spacing(1),
        paddingTop: spacing(1),
        '> *': {
            color: palette.text.secondary
        },
    }
})

export const WorkoutExerciseCellLabel = styled(Box)(({ theme }) => {
    const { breakpoints, palette } = theme

    return {
        width: '100%',
        flex: '1',
        color: palette.text.primary,
        [breakpoints.down('sm')]: {
            width: '100%',
            flex: 'auto',
        }
    }
})

export const Description = styled(Typography)(({ theme }) => {
    const { palette, typography } = theme

    return {
        ...typography.body2,
        color: palette.text.secondary
    }
})

export const WorkoutExerciseCellShort = styled(BoxEllipsis)(({ theme }) => {
    const { spacing } = theme

    return {
        width: spacing(7),
        textAlign: 'center',
        '> span.badge': {
            display: 'inline-block',
            width: spacing(4),
            height: spacing(4),
            lineHeight: spacing(3.8),
            borderRadius: '50%',
        }
    }
})

export const WorkoutExerciseCellCounter = styled(WorkoutExerciseCellShort)(({ theme }) => {
    const { palette } = theme

    return {
        '> span.badge-counter': {
            backgroundColor: grey[800],
            color: palette.grey[200]
        }
    }
})