import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProveedorBarraLateral } from './shared/providers/ProveedorBarraLateral'
import App from './App'
import './theme/globals.css'
import { registerSW } from 'virtual:pwa-register'

// Registro automático del Service Worker para modo Offline
registerSW({ immediate: true })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProveedorBarraLateral>
        <App />
      </ProveedorBarraLateral>
    </QueryClientProvider>
  </React.StrictMode>,
)
