import { useState } from "react";

const useDrawer = (): { openDrawer: boolean, toggleDrawer: (isOpen: boolean) => void } => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const toggleDrawer = (isOpen: boolean): void => {
        setOpenDrawer(isOpen)
    }

    return { openDrawer, toggleDrawer }
}

export default useDrawer