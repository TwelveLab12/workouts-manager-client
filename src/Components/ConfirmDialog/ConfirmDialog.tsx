import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    useTheme,
} from '@mui/material'

import { ConfirmDialogProps } from "./ConfirmDialog.types";

const ConfirmDialog = ({
    open,
    handleClose,
    handleConfirmation,
    contentTitle = undefined,
    contentText = undefined,
}: ConfirmDialogProps): JSX.Element => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby='responsive-dialog-title'
            >
                <DialogTitle id='responsive-dialog-title'>
                    {contentTitle ?? <>Action Confirmation ?</>}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {contentText ?? <>Confirm this action ?</>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button autoFocus color='error' variant={'contained'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant={'contained'} onClick={handleConfirmation} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmDialog
