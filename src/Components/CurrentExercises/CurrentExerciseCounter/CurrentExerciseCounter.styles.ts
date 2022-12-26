import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CounterStyled = styled(Typography)(({ theme }) => ({
    fontWeight: (theme.typography as Record<string, string>).fontWeightBold,
    fontSize: 45,
    color: theme.palette.text.secondary,
}))



const ExerciseCounterStyled = styled(Stack)(({ theme }) => ({
    flex: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: theme.spacing(4),
}))

export { CounterStyled, ExerciseCounterStyled };
