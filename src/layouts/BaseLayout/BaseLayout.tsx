import { Menu } from '@mui/icons-material'
import { AppBar, Box, Container, IconButton, Toolbar, useTheme } from '@mui/material'
import { MutableRefObject } from 'react'
import { Outlet } from 'react-router-dom'

import { ReactComponent as DumbellLogo } from '../../assets/icons/dumbbell-sports-svgrepo-com.svg'
import Drawer from '../Drawer/Drawer'
import useDrawer from '../Drawer/useDrawer'
import {
    FooterStyled,
    FooterToolbarContentStyled,
    FooterToolbarStyled,
    TitleStyled,
} from './BaseLayout.styles'

const BaseLayout = ({
    toolbarRef,
}: {
    toolbarRef: MutableRefObject<HTMLDivElement | undefined> | undefined
}): JSX.Element => {
    const { isOpenedDrawer, openDrawer, closeDrawer, goTo } = useDrawer()
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
                        onClick={openDrawer}
                    >
                        <Menu />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                        <DumbellLogo height={35} width={50} style={{ top: 0 }} />
                        <TitleStyled noWrap>Workout Manager</TitleStyled>
                    </Box>
                </Toolbar>
            </AppBar>
            <main>
                <Container maxWidth={'xl'} sx={{ py: 3, my: 3, mx: 'auto', border: '0px solid' }}>
                    <Outlet />
                </Container>
            </main>
            <FooterStyled>
                <FooterToolbarStyled>
                    <FooterToolbarContentStyled ref={toolbarRef}></FooterToolbarContentStyled>
                </FooterToolbarStyled>
            </FooterStyled>
            {/*  isOpenedDrawer,openDrawer, closeDrawer */}
            <Drawer
                isOpenedDrawer={isOpenedDrawer}
                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
                goTo={goTo}
            />
        </>
    )
}

export default BaseLayout
