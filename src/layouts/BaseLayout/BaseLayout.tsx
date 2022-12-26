import { Menu } from "@mui/icons-material";
import { AppBar, Box, Container, IconButton, Toolbar, useTheme } from "@mui/material";
import { MutableRefObject } from "react";
import { Outlet } from "react-router-dom";

import { ReactComponent as DumbellLogo } from "../../assets/icons/dumbbell-sports-svgrepo-com.svg";
import Drawer from "../Drawer/Drawer";
import useDrawer from "../Drawer/useDrawer";
import { StyledTitle } from "./BaseLayout.styles";

const BaseLayout = ({
    toolbarRef,
}: {
    toolbarRef: MutableRefObject<HTMLDivElement | undefined> | undefined
}): JSX.Element => {
    const { openDrawer, toggleDrawer } = useDrawer()
    const { palette } = useTheme()

    return (
        <>
            <AppBar
                position='relative'
                sx={{
                    backgroundColor: palette.appBar.main,
                    color: palette.appBar.contrastText,
                }}
            >
                <Toolbar sx={{ py: 0, alignItems: 'baseline', justifyContent: 'flex-start' }}>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        sx={{ mr: 0 }}
                        onClick={() => toggleDrawer(true)}
                    >
                        <Menu />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                        <DumbellLogo height={35} width={50} style={{ top: 0 }} />
                        <StyledTitle noWrap>Workout Manager</StyledTitle>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
            <main>
                <Container maxWidth={'xl'} sx={{ py: 3, my: 3, mx: 'auto', border: '0px solid' }}>
                    <Outlet />
                </Container>
            </main>
            <footer>
                <Toolbar sx={{ py: 3 }}>
                    <Box ref={toolbarRef}></Box>
                </Toolbar>
            </footer>
        </>
    )
}

export default BaseLayout
