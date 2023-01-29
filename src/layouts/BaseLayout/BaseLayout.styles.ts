import { Box, styled, Theme, Toolbar, Typography } from "@mui/material";

export const TitleStyled = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: '3rem',
    fontWeight: 600,
    fontFamily: '"Bebas Neue","Roboto","Helvetica","Arial",sans-serif',
    color: theme.palette.text.secondary,
    marginLeft: 4,
}))

export const FooterStyled = styled('footer')(({ theme }: { theme: Theme }) => ({
    zIndex: 1000,
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.grey[300]
}))

export const FooterToolbarStyled = styled(Toolbar)(({ theme }: { theme: Theme }) => ({
    top: -30,
    py: 3,
    position: 'relative',
    maxWidth: '260px',
    minWidth: '200px',
    margin: 'auto',
    zIndex: 1001,

}))

export const FooterToolbarContentStyled = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
}))