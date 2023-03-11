import { createContext, ReactNode, useContext } from 'react'

interface ValueProps {
    isOnline: boolean
}

export const config: ValueProps = { isOnline: Boolean(Number(import.meta.env.VITE_IS_ONLINE_MODE)) }

export const AppStatusContext = createContext(config)

const AppStatusProvider = ({
    children,
    value,
}: {
    children: ReactNode
    value: ValueProps
}): JSX.Element => {
    return <AppStatusContext.Provider value={value}>{children}</AppStatusContext.Provider>
}

export const useAppStatusContext = (): ValueProps => {
    const context = useContext(AppStatusContext)
    if (context === undefined) {
        throw new Error('Undefined AppStatusContext error')
    }

    return context
}

export default AppStatusProvider
