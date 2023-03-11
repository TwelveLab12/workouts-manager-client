import { Menu } from '@mui/icons-material'
import { AppBar, Box, Chip, Container, IconButton, Toolbar, useTheme } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { MutableRefObject } from 'react'
import { Outlet } from 'react-router-dom'

import { ReactComponent as DumbellLogo } from '../../assets/icons/dumbbell-sports-svgrepo-com.svg'
import { useAppStatusContext } from '../../Providers/AppStatusProvider'
import { SensorsIcon, SensorsOffIcon } from '../../Styles/Icons'
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
    const AppStatus = useAppStatusContext()

    return (
        <>
            <AppBar
                position='relative'
                sx={{
                    backgroundColor: palette.appBar.main,
                    color: palette.appBar.contrastText,
                }}
            >
                <Toolbar sx={{ py: 0, alignItems: 'center', justifyContent: 'flex-start' }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'baseline', flex: 'auto' }}>
                        <DumbellLogo height={35} width={50} style={{ top: 0 }} />
                        <TitleStyled noWrap>Workout Manager</TitleStyled>
                    </Box>
                    <Box>
                        <OnlineStatusChip isOnline={AppStatus.isOnline} />
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

            <Drawer
                isOpenedDrawer={isOpenedDrawer}
                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
                goTo={goTo}
            />
        </>
    )
}

const OnlineStatusChip = ({ isOnline }: { isOnline: boolean }): JSX.Element => {
    const { palette } = useTheme()

    const chipColor = isOnline ? green[500] : red[400]
    const icon = isOnline ? <SensorsIcon /> : <SensorsOffIcon />
    const label = isOnline ? 'online' : 'offline'

    return (
        <Chip
            icon={icon}
            label={label}
            variant='outlined'
            sx={{
                backgroundColor: palette.common.white,
                borderColor: palette.common.white,
                '> *': { color: chipColor },
                '> .MuiChip-icon': { color: chipColor },
            }}
        />
    )
}

export default BaseLayout
