import { useAppDispatch, useAppSelector } from "../../Stores/hooks";
import { fetchStatus, releaseStatus } from "../../Stores/queryStatusSlice";
import { AppDispatch } from "../../Stores/store";

const useExerciseQueryStatus = (): {
    dispatch: AppDispatch,
    isFetching: boolean
    dispatchFetchStatus: () => void
    dispatchReleaseStatus: () => void
} => {
    const dispatch = useAppDispatch()
    const isFetching = useAppSelector((state) => {
        return state.queryStatus.isFecthing
    })

    const dispatchFetchStatus = (): void => {
        dispatch(fetchStatus())
    }
    const dispatchReleaseStatus = (): void => {
        dispatch(releaseStatus())
    }

    return {
        dispatch,
        isFetching,
        dispatchFetchStatus,
        dispatchReleaseStatus,
    }
}
export default useExerciseQueryStatus