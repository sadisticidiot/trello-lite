import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { AuthProvider } from './AuthProvider.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

import App from './pages/App.jsx'
import Notepad from './pages/Notepad.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Menu from './pages/Menu.jsx'

import CreateAccount from './pages/CreateAccount.jsx'
import FinishSetup from './pages/FinishSetup.jsx'
import PageLoadguard from './ui/PageLoadGuard.jsx'

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

import Notes from './pages/Notes.jsx'
import PinnedNotes from './pages/Tasks.jsx'
import ArchivedNotes from './pages/ArchivedNotes.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/auth-intermission', element: <PageLoadguard /> },
  { path: '/signin', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  {
    element: <ProtectedRoute />,
    children: [
      { path: '/create-account', element: <CreateAccount /> },
      { path: '/finish-setup', element: <FinishSetup /> },
      { 
        path: '/app', 
        element: <App />,
        children: [
          { index: true, element: <Home />},
          { path: 'menu', element: <Menu />},
          { path: 'notepad/:id', element: <Notepad />},
          { 
            path: 'profile',
            element: <Profile />,
            children: [
              { index: true, element: <Notes />},
              { path: 'tasks', element: <PinnedNotes />},
              { path: 'archived-notes', element: <ArchivedNotes />},
            ]
          },
        ]
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)