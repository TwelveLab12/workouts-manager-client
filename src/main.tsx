import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'

import App from './App'
import AppStatusProvider from './Providers/AppStatusProvider'
import store from './Stores/store'
import { theme } from './theme/theme'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AppStatusProvider>
            <StoreProvider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </QueryClientProvider>
            </StoreProvider>
        </AppStatusProvider>
    </React.StrictMode>,
)
