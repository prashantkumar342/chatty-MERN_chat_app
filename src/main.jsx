import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/index.scss"
import { BrowserRouter } from 'react-router-dom'
import { ApiProvider } from './context/api/ApiProvider.jsx'
import { GlobalVariableProvider } from './context/global/GlobalVariable.jsx'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@emotion/react'
import theme from "./utils/theme.js"
import { SocketProvider } from './context/socket/socket.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <SocketProvider>
        <ApiProvider>
          <GlobalVariableProvider>
            <ThemeProvider theme={theme}>
              <App />
              <Toaster />
            </ThemeProvider>
          </GlobalVariableProvider>
        </ApiProvider>
      </SocketProvider>

    </BrowserRouter>
  </StrictMode>,
)
