import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { theme } from "../../../theme/theme";
import { CounterButtonProps } from "./CurrentExerciseCounter.types";

const AddButton = ({ onClick }: CounterButtonProps): JSX.Element => {
    return (
        <IconButton
            onClick={onClick}
            size='small'
            sx={{
                backgroundColor: theme.palette.counter.actions.increment.main,
                '&:hover': {
                    backgroundColor: theme.palette.counter.actions.increment.light,
                },
            }}
        >
            <Add
                sx={{
                    fontSize: '1.2rem',
                    color: theme.palette.common.white,
                }}
            />
        </IconButton>
    )
}

export default AddButton
