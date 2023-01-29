import { Fab, styled, Theme } from "@mui/material";

export const BaseFabStyled = styled(Fab)(({ theme }: { theme: Theme }) => {
    return {
        border: `5px solid ${theme.palette.grey[200]}`
    }
})


export const AddExerciseFabStyled = styled(BaseFabStyled)({})

export const SaveExerciseFabStyled = styled(BaseFabStyled)({})

export const ClearWorkoutFabStyled = styled(BaseFabStyled)({})
