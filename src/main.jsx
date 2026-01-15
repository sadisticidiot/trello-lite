import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { AuthProvider } from './AuthProvider.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

import App from './pages/App.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Email from './pages/Email.jsx'
import CreateAccount from './pages/CreateAccount.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { 
    path: '/signup', 
    element: <Signup />,
    children: [
      { index: true, element: <Email />},
      { path: 'create-account', element: <CreateAccount /> },
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [{
      path: '/app', element: <App />
    }]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
