import { Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { theme } from "../../../theme/theme";
import { CounterButtonProps } from "./CurrentExerciseCounter.types";

const RemoveButton = ({ onClick }: CounterButtonProps): JSX.Element => {
    return (
        <IconButton
            onClick={onClick}
            size='small'
            sx={{
                backgroundColor: theme.palette.counter.actions.decrement.main,
                '&:hover': {
                    backgroundColor: theme.palette.counter.actions.decrement.light,
                },
            }}
        >
            <Remove
                sx={{
                    fontSize: '1.2rem',
                    color: theme.palette.common.white,
                }}
            />
        </IconButton>
    )
}

export default RemoveButton
