import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'

import './index.css'

import { AuthProvider } from './AuthProvider.jsx'

import CreateAccount from './pages/CreateAccount.jsx'
import FinishSetup from './pages/FinishSetup.jsx'
import PageLoadguard from './ui/PageLoadGuard.jsx'

import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

import Footer from './ui/Footer.jsx'
import Home from './pages/Home.jsx'
import Notes from './pages/Notes.jsx'
import PinnedNotes from './pages/Tasks.jsx'
import ArchivedNotes from './pages/ArchivedNotes.jsx'
import Settings from './pages/Settings.jsx'

const router = createBrowserRouter([
  { path: '/auth-intermission', element: <PageLoadguard /> },
  { path: '/signin', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  { path: '/create-account', element: <CreateAccount /> },
  { path: '/finish-setup', element: <FinishSetup /> },
  {
    element: <Footer />,
    children: [
      { 
        path: '/',
        element: <Home />,
        children: [
          { index: true, element: <Notes /> },
          { path: 'tasks', element: <PinnedNotes />},
          { path: 'archived-notes', element: <ArchivedNotes />}, 
        ]
      },
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