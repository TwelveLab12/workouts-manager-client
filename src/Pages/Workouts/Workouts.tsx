import { Box, Typography } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query/build/lib/types";
import { MutableRefObject, useEffect, useState } from "react";

import { DataResponse, WorkoutDataResponse } from "../../api/strapi.types";
import { isErrorResponse } from "../../api/strapiTypeGuards";
import useWorkoutQueries from "../../Hooks/reactQueries/useWorkoutQueries";
import useFormatResponse from "../../Hooks/useFormatStrapiResponse/useFormatStrapiResponse";
import useLocalStorage from "../../Hooks/useLocalStorage/useLocalStorage";
import { WorkoutProps } from "../../types/types";

const Workouts = (toolbarRef: {
    toolbarRef: MutableRefObject<HTMLDivElement | undefined> | undefined
}): JSX.Element => {
    const { formatWorkoutResponse } = useFormatResponse()
    const [getWorkouts, workoutsData, workoutsQueryError] = useWorkoutQueries()
    const [workouts, setWorkouts] = useState<undefined | WorkoutProps[]>(undefined)
    const [currentWorkout] = useLocalStorage<undefined | WorkoutProps>('current-workout', undefined)

    useEffect(() => {
        // Workouts
        if (
            (getWorkouts as UseQueryResult<[DataResponse]>)?.isSuccess &&
            !workoutsQueryError &&
            !isErrorResponse(workoutsData)
        ) {
            if (workoutsData == null) {
                return
            }
            const mappedWorkouts = workoutsData.map(
                (workout: WorkoutDataResponse): WorkoutProps => {
                    return formatWorkoutResponse(workout)
                },
            )
            setWorkouts(() => mappedWorkouts ?? undefined)
        }
    }, [workoutsData, currentWorkout])

    return (
        <>
            <Typography variant='h2' color='inherit' noWrap>
                Workouts History
            </Typography>
            {workouts
                ?.filter((workout: WorkoutProps) => {
                    return workout.id !== currentWorkout?.id
                })
                .map((workout: WorkoutProps) => {
                    return <Box key={workout.id}> {workout.label}</Box>
                })}
        </>
    )
}

export default Workouts
