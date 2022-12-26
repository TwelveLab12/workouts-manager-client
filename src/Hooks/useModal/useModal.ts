import { useState } from "react";

interface useModalOutput {
    open: boolean
    handleClickOpen: () => void
    handleClose: () => void
}

const useModal = (): useModalOutput => {

    const [open, setOpen] = useState(false)
    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    return { open, handleClickOpen, handleClose }
}

export default useModal