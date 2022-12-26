import type { Theme } from "@mui/material";
import { styled,Typography } from "@mui/material";

export const StyledTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: '3rem',
    fontWeight: 600,
    fontFamily: '"Bebas Neue","Roboto","Helvetica","Arial",sans-serif',
    color: theme.palette.text.secondary,
    marginLeft: 4,
}))