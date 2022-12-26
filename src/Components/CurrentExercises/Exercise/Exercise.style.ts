import { Card } from "@mui/material";
import { styled } from "@mui/system";

import { theme } from "../../../theme/theme";

export const ExerciseCardStyled = styled(Card)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'normal',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey.A100,
})
