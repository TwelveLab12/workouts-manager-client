import { Box, Container, Paper, styled } from "@mui/material";

export const WorkoutContainerStyled = styled(Container)(({ theme }) => {
    const { spacing } = theme

    return {
        paddingTop: spacing(0),
        paddingBottom: spacing(0),
        paddingLeft: spacing(0),
        paddingRight: spacing(0),
        marginBottom: spacing(0),
    }
})

// Header
export const WorkoutHeaderStyled = styled(Box)(({ theme }) => {
    const { spacing } = theme

    return {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-between',
        marginBottom: spacing(1.5),
        '> .MuiBox-root': {
            paddingBottom: spacing(0.2),
            paddingTop: spacing(0),
            paddingLeft: spacing(0),
            paddingRight: spacing(0),
            '&:first-of-type': {
                paddingLeft: spacing(0),
            },
            '&:last-child': {
                paddingRight: spacing(0),
            },
        }
    }
})

export const WorkoutHeaderLiteralsStyled = styled(Box)(() => {
    return {
        flex: 'auto'
    }
})

export const WorkoutHeaderLabelStyled = styled(Box)(({ theme }) => {
    const { typography, palette } = theme

    return {
        ...typography.h4,
        textTransform: 'capitalize',
        color: palette.primary.main,
        width: '100%',
    }
})

export const WorkoutHeaderDescriptionStyled = styled(Box)(({ theme }) => {
    const { typography, palette } = theme

    return {
        ...typography.caption,
        fontSize: typography.subtitle2.fontSize,
        color: palette.text.secondary,
        '&:first-letter': {
            textTransform: 'uppercase',
        },
    }
})


export const WorkoutHeaderActionsStyled = styled(Box)(({ theme }) => {
    return {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        flex: 1,
    }
})

// Content
export const WorkoutContentStyled = styled(Paper)(({ theme }) => {
    const { spacing } = theme

    return {
        padding: spacing(0.5),
        minWidth: spacing(34),
    }
})