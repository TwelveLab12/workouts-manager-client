import { Dispatch, SetStateAction, useState } from 'react'

import { putWorkout } from '../../Queries/workoutQueries'
import type { WorkoutProps } from '../../types/types'
import useAppLocalStorage from '../useAppLocalStorage/useAppLocalStorage'

interface useWorkoutFormProps {
    editMode: boolean
    setEditMode: Dispatch<SetStateAction<boolean>>
    toggleEditMode: () => void
    data: WorkoutProps
    handleFormChange: (field: string, value: string) => void
    onSave: () => void
    onCancel: () => void
}

const initialData: WorkoutProps = { label: '', description: '' }

const useWorkoutForm = (workout: WorkoutProps): useWorkoutFormProps => {
    const [editMode, setEditMode] = useState(false)
    const [data, setData] = useState<WorkoutProps>(workout ?? initialData)
    const { setWorkoutsStored } = useAppLocalStorage()

    const toggleEditMode = (): void => {
        setEditMode((prevMode) => !prevMode)
    }

    const handleFormChange = (field: string, value: string): void => {
        setData((prevData) => {
            const newData: Record<string, string> = {}
            newData[field] = value
            return { ...prevData, ...newData }
        })
    }

    const onCancel = (): void => {
        setData(workout ?? initialData)
        toggleEditMode()
    }

    const onSave = (): void => {
        if (data.id) {
            setWorkoutsStored((current) =>
                current.map((workoutItem) => {
                    if (workoutItem.id === data.id) {
                        return data
                    }
                    return workoutItem
                }),
            )
        }
        toggleEditMode()
    }

    return { editMode, setEditMode, toggleEditMode, data, handleFormChange, onSave, onCancel }
}

export default useWorkoutForm
