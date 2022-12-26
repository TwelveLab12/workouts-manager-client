import { Box, List, ListItemButton, SwipeableDrawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { appRoutes } from "../../routes/appRoutes";

const Drawer = ({
    openDrawer,
    toggleDrawer,
}: {
    openDrawer: boolean
    toggleDrawer: (isOpen: boolean) => void
}): JSX.Element => {
    const navigate = useNavigate()

    const goTo = (route: string): void => {
        navigate(route)
    }

    return (
        <SwipeableDrawer
            anchor={'left'}
            open={openDrawer}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
            sx={{ minWidth: '20rem' }}
        >
            <Box sx={{ width: 250 }} role='presentation'>
                <List>
                    <ListItemButton onClick={() => goTo(appRoutes.home)}>
                        Workout Of The Day
                    </ListItemButton>

                    <ListItemButton onClick={() => goTo(appRoutes.workouts)}>
                        Previous Workouts
                    </ListItemButton>
                </List>
            </Box>
        </SwipeableDrawer>
    )
}

export default Drawer
