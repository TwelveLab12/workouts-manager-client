export interface ConfirmDialogProps {
    open: boolean
    handleClose: () => void
    handleConfirmation: () => void
    contentText?: undefined | string
    contentTitle?: undefined | string
}