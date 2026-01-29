import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { AuthProvider } from './AuthProvider.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

import App from './pages/App.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import CreateAccount from './pages/CreateAccount.jsx'
import Signup from './pages/Signup.jsx'
import FinishSetup from './pages/FinishSetup.jsx'
import Interface from './ui/Interface.jsx'
import PageLoadguard from './ui/PageLoadGuard.jsx'
import Submitted from './pages/Submitted.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/auth-intermission', element: <PageLoadguard /> },
  { path: '/signin', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  {
    element: <ProtectedRoute />,
    children: [
      { path: '/app', element: <App /> },
      { path: '/create-account', element: <CreateAccount /> },
      { path: '/finish-setup', element: <FinishSetup /> },
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
