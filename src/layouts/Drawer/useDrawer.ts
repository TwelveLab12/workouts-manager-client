import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useDrawer = (): { isOpenedDrawer: boolean, openDrawer: () => void, closeDrawer: () => void, goTo: (route: string) => void } => {
    const [isOpenedDrawer, setIsOpenedDrawer] = useState(false)
    const [shouldClose, setShouldClose] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (shouldClose) {
            setShouldClose(() => {
                closeDrawer()
                return false
            })
        }
    }, [shouldClose])


    const closeDrawer = (): void => {
        setIsOpenedDrawer(false)
    }

    const openDrawer = (): void => {
        setIsOpenedDrawer(true)
    }

    const goTo = (route: string): void => {
        setShouldClose(() => {
            navigate(route)
            return true
        })
    }

    return { isOpenedDrawer, openDrawer, closeDrawer, goTo }
}

export default useDrawer