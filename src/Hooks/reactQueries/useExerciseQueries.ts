import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { useEffect, useState } from 'react'

import { fetchExercises } from '../../Queries/Exercise'
import { ExerciseDataResponse } from '../../api/strapi.types'
import { isErrorResponse } from '../../api/starpiTypeGuards'

const useExerciseQueries = () => {
    const [exercisesData, setExercisesData] = useState<undefined | [ExerciseDataResponse]>(undefined)
    const [exercisesQueryError, setExercisesQueryError] = useState<boolean>(false)
    const { data, error, isSuccess } = useQuery({ queryKey: ['exercises-get'], queryFn: async () => await fetchExercises() })

    const getExercises = { data: data, error: error, isSuccess: isSuccess }

    useEffect(() => {
        if (isErrorResponse(data) && error || !isSuccess) {
            setExercisesQueryError(true)
            return
        }
        setExercisesQueryError(false)
        setExercisesData(data as [ExerciseDataResponse])
    }, [data, error, isSuccess])

    /* 
        // Access the client
        const queryClient = useQueryClient()
        // Mutations
        const mutation = useMutation({
            mutationFn: postTodo,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['todos'] })
            },
        }) 
    */

    return [getExercises, exercisesData, exercisesQueryError]
}

export default useExerciseQueries