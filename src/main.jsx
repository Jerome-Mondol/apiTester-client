import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Theme } from '@radix-ui/themes'
import { RouterProvider } from 'react-router/dom'
import { router } from './router/router.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>,
)
