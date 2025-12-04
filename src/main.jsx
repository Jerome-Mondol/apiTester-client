import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Theme } from '@radix-ui/themes'
import { RouterProvider } from 'react-router/dom'
import { router } from './router/router'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <Theme>
      <AuthProvider >
        <div><Toaster /></div>
          <RouterProvider router={router} />
      </AuthProvider>
    </Theme>
)
