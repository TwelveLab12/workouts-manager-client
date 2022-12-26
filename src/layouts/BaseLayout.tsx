import {
    AppBar,
    Container,
    Toolbar,
    Typography,
} from '@mui/material'

import { Outlet } from 'react-router-dom'

const BaseLayout = (): JSX.Element => {
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h1" color="inherit" noWrap>
                        Workout Manager
                    </Typography>
                </Toolbar>
            </AppBar>
            <main >
                <Container maxWidth={'xl'} sx={{ py: 3, my: 3, mx: 'auto', border: '0px solid' }}>
                    <Outlet />
                </Container>
            </main>
        </>
    )
}

export default BaseLayout