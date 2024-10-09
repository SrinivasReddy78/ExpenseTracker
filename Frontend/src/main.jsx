import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Loader from './components/Loader.jsx'
import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute.jsx'

const Signup = lazy(() => import('./pages/Signup.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const View = lazy(() => import('./pages/View.jsx'));
const Incomes = lazy(() => import('./pages/Incomes.jsx'));
const Expenses = lazy(() => import('./pages/Expenses.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        )
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <Dashboard />
          },
          {
            path: 'view-transactions',
            element: <View />
          },
          {
            path: 'incomes',
            element: <Incomes />
          },
          {
            path: 'expenses',
            element: <Expenses />
          },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  // </StrictMode>,
)
