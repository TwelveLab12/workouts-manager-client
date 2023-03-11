import type { Dispatch, SetStateAction } from "react"

import type { ExerciseProps } from "../../types/types"
import useLocalStorage from "../useLocalStorage/useLocalStorage"

interface appLocalStorageKeysProps {
    CURRENT_EXERCISES: string
}

interface useAppLocalStorageOutput {
    appLocalStorageKeys: appLocalStorageKeysProps
    storedExercises: ExerciseProps[]
    setStoredExercises: Dispatch<SetStateAction<ExerciseProps[]>>
}

const useAppLocalStorage = (): useAppLocalStorageOutput => {

    const appLocalStorageKeys: appLocalStorageKeysProps = {
        CURRENT_EXERCISES: 'current-exercises'
    }

    const [storedExercises, setStoredExercises] = useLocalStorage(appLocalStorageKeys.CURRENT_EXERCISES, [] as ExerciseProps[])


    return { appLocalStorageKeys, storedExercises, setStoredExercises, }
}

export default useAppLocalStorage