import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Theme } from '@radix-ui/themes'
import { RouterProvider } from 'react-router/dom'
import { router } from './router/router.js'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <Theme>
      <AuthProvider >
        <RouterProvider router={router} />
      </AuthProvider>
    </Theme>
)
