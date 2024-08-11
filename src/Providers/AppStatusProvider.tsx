import { createContext, ReactNode, useContext } from 'react'

import { checkStrapiReachable } from '../api/api'

interface ValueProps {
    isOnline: boolean
}

export const config: ValueProps = { isOnline: Boolean(Number(import.meta.env.VITE_IS_ONLINE_MODE)) }

export const AppStatusContext = createContext(config)

const AppStatusProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const checkOnlineStatus = checkStrapiReachable()
    return (
        <AppStatusContext.Provider value={{ ...config, isOnline: checkOnlineStatus }}>
            {children}
        </AppStatusContext.Provider>
    )
}

export const useAppStatusContext = (): ValueProps => {
    const context = useContext(AppStatusContext)
    if (context === undefined) {
        throw new Error('Undefined AppStatusContext error')
    }

    return context
}

export default AppStatusProvider
