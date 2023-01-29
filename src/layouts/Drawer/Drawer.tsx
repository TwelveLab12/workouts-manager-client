import { Box, List, ListItemButton, SwipeableDrawer } from '@mui/material'

import { appRoutes } from '../../routes/appRoutes'

const Drawer = ({
    closeDrawer,
    goTo,
    isOpenedDrawer,
    openDrawer,
}: {
    closeDrawer: () => void
    goTo: (route: string) => void
    isOpenedDrawer: boolean
    openDrawer: () => void
}): JSX.Element => {
    const { home, workouts, favoriteWorkouts } = appRoutes

    return (
        <SwipeableDrawer
            hideBackdrop={false}
            anchor={'left'}
            open={isOpenedDrawer}
            onClose={closeDrawer}
            onOpen={openDrawer}
            sx={{ minWidth: '20rem' }}
        >
            <Box sx={{ width: 250 }} role='presentation'>
                <List>
                    <ListItemButton onClick={() => goTo(home)}>Workout Of The Day</ListItemButton>

                    <ListItemButton onClick={() => goTo(workouts)}>
                        Previous Workouts
                    </ListItemButton>
                    <ListItemButton onClick={() => goTo(favoriteWorkouts)}>
                        Favorite Workouts
                    </ListItemButton>
                </List>
            </Box>
        </SwipeableDrawer>
    )
}

export default Drawer
