
interface appRoutesProps {
    home: string
    workouts: string
    favoriteWorkouts: string
}

export const appRoutes: appRoutesProps = {
    home: '/',
    workouts: '/workouts',
    favoriteWorkouts: '/workouts/favorites',
}