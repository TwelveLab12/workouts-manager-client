import Workouts from '../Components/Workouts/Workouts'

const FavoriteWorkoutsPage = (): JSX.Element => {
    return <Workouts onlyFavorites={true} />
}

export default FavoriteWorkoutsPage
