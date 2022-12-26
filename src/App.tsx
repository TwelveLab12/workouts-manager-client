import { Box, CircularProgress } from "@mui/material";
import { lazy, Suspense, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BaseLayout from "./layouts/BaseLayout/BaseLayout";
import { appRoutes } from "./routes/appRoutes";

const CurrentWorkoutPage = lazy(async () => await import('./Pages/CurrentWorkout/CurrentWorkout'))
const WorkoutsPage = lazy(async () => await import('./Pages/Workouts/Workouts'))

const App = (): JSX.Element => {
    const toolbarRef = useRef<HTMLDivElement>()

    return (
        <Suspense
            fallback={
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }
        >
            <BrowserRouter>
                <Routes>
                    <Route element={<BaseLayout toolbarRef={toolbarRef} />}>
                        <Route
                            path={appRoutes.home}
                            element={<CurrentWorkoutPage toolbarRef={toolbarRef} />}
                        />
                        <Route
                            path={appRoutes.workouts}
                            element={<WorkoutsPage toolbarRef={toolbarRef} />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default App
