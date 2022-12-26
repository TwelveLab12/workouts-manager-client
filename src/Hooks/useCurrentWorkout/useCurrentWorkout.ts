import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { isErrorResponse } from "../../api/strapiTypeGuards";
import { createWorkout, fetchWorkout } from "../../Queries/Workout";
import { WorkoutProps } from "../../types/types";
import useFormatResponse from "../useFormatStrapiResponse/useFormatStrapiResponse";
import useLocalStorage from "../useLocalStorage/useLocalStorage";

interface useCurrentWorkoutOutput {
    currentWorkout: undefined | WorkoutProps
    initWorkout: () => void
    setCurrentWorkout: Dispatch<SetStateAction<WorkoutProps | undefined>>
}

const useCurrentWorkout = (): useCurrentWorkoutOutput => {

    const { formatWorkoutResponse } = useFormatResponse()

    const [currentWorkout, setCurrentWorkout] = useLocalStorage<undefined | WorkoutProps>(
        'current-workout',
        undefined,
    )
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        const updateWorkout = (): void => {
            if (currentWorkout?.id) {
                fetchWorkout(currentWorkout.id)
                    .then((fetchedCurrentWorkout) => {
                        setCurrentWorkout(() => formatWorkoutResponse(fetchedCurrentWorkout))
                        console.info('Current workout fetched')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    .finally(() => {
                        setIsUpdated(true)
                    })
            }
        }

        if (!isUpdated) {
            updateWorkout()
        }
    }, [])

    const initWorkout = (): void => {
        createWorkout({})
            .then((response) => {
                if (isErrorResponse(response)) {
                    console.error(response)
                    return
                }
                setCurrentWorkout(() => formatWorkoutResponse(response))
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return { currentWorkout, initWorkout, setCurrentWorkout }
}

export default useCurrentWorkout