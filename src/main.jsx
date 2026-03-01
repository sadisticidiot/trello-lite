import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'

import './index.css'

import { AuthProvider } from './AuthProvider.jsx'
import { NotesLogic } from './logic/NotesLogic.jsx'

import CreateAccount from './pages/CreateAccount.jsx'
import FinishSetup from './pages/FinishSetup.jsx'
import PageLoadguard from './ui/PageLoadGuard.jsx'

import Footer from './ui/Footer.jsx'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'

const router = createBrowserRouter([
  { path: '/auth-intermission', element: <PageLoadguard /> },

  { path: '/create-account', element: <CreateAccount /> },
  { path: '/finish-setup', element: <FinishSetup /> },
  {
    element: (
      <NotesLogic>
        <Footer />
      </NotesLogic>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/groups', element: <Home /> },
      { path: '/settings', element: <Settings /> },
    ]
  } 
])

registerSW({
  onNeedRefresh() {
    console.log(`New version available`)
  },
  onOfflineReady() {
    console.log('App ready to work online')
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)