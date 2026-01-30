import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { AuthProvider } from './AuthProvider.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

import App from './pages/App.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Bookmark from './pages/Bookmark.jsx'
import Menu from './pages/Menu.jsx'

import CreateAccount from './pages/CreateAccount.jsx'
import FinishSetup from './pages/FinishSetup.jsx'
import PageLoadguard from './ui/PageLoadGuard.jsx'

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

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
          { path: 'profile', element: <Profile />},
          { path: 'bookmarks', element: <Bookmark />},
          { path: 'menu', element: <Menu />},
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
  </StrictMode>,
)
