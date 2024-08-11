import { Box, CircularProgress } from '@mui/material'
import { lazy, Suspense, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import BaseLayout from './layouts/BaseLayout/BaseLayout'
import { appRoutes } from './routes/appRoutes'

const CurrentWorkoutPage = lazy(async () => await import('./Pages/CurrentWorkoutPage'))
const WorkoutsPage = lazy(async () => await import('./Pages/WorkoutsPage'))
const FavoriteWorkoutsPage = lazy(async () => await import('./Pages/FavoriteWorkoutsPage'))
const DesignSystem = lazy(async () => await import("./Pages/DesignSystem"))

const App = (): JSX.Element => {
    const toolbarRef = useRef<HTMLDivElement>()
    const { home, workouts, favoriteWorkouts } = appRoutes

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
                            path={home}
                            element={<CurrentWorkoutPage toolbarRef={toolbarRef} />}
                        />

                        <Route path={workouts} element={<WorkoutsPage />} />
                        <Route path={favoriteWorkouts} element={<FavoriteWorkoutsPage />} />
                        <Route path={'/design-system'} element={<DesignSystem />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default App
