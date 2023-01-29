import { Add, ClearAll, LibraryAdd } from '@mui/icons-material'
import { Portal } from '@mui/material'

import {
    AddExerciseFabStyled,
    ClearWorkoutFabStyled,
    SaveExerciseFabStyled,
} from './CurrentWorkoutToolbar.styles'

interface CurrentWorkoutToolbarProps {
    currentToolbarRef?: HTMLDivElement
    storeToHistory: () => void
    handleAddExercise: () => void
}

const CurrentWorkoutToolbar = ({
    currentToolbarRef,
    storeToHistory,
    handleAddExercise,
}: CurrentWorkoutToolbarProps): JSX.Element => {
    if (currentToolbarRef) {
        return (
            <Portal container={currentToolbarRef}>
                <ClearWorkoutFabStyled color='error' size='medium' onClick={storeToHistory}>
                    <ClearAll />
                </ClearWorkoutFabStyled>
                <AddExerciseFabStyled color='primary' onClick={handleAddExercise}>
                    <Add />
                </AddExerciseFabStyled>
                <SaveExerciseFabStyled color='secondary' size='medium' onClick={storeToHistory}>
                    <LibraryAdd />
                </SaveExerciseFabStyled>
            </Portal>
        )
    }
    return <></>
}

export default CurrentWorkoutToolbar
