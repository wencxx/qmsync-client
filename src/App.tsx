import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import ProtectedRoute from "./routes/protected-routes";
import Layout from "./layout/layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import ProfilePage from './pages/profile'
import ActivityLogs from './pages/activity-logs'
import Unauthorized from "./pages/Unauthorized";
// documents
import PendingControlledForms from "./pages/documents/pending-control-form";
import CompletedControlledForms from "./pages/documents/completed-control-form";
import PendingQualityRecords from "./pages/documents/pending-quality-records";
import CompletedQualityRecords from "./pages/documents/completed-quality-records";
// courses
import Departments from "./pages/courses/departments";
import FacultyLists from "./pages/courses/faculty-lists";
import FacultyFormsList from "./pages/courses/faculty-forms-lists";
import FacultyRecordsLists from "./pages/courses/faculty-records-lists";
// manage docs
import ManageControlledForms from '@/pages/manage-documents/controlled-form'
import ManageQualityRecords from '@/pages/manage-documents/quality-records'
import { useEffect } from "react";
import axios from "axios";
import { UserData } from "./types/user";

const publicRoutes = [
  {
    path: '/login',
    element: (
      useAuthStore.getState().isAuthenticated()
        ? <Navigate to={'/'} replace />
        : <LoginPage />
    )
  },
  {
    path: '/register',
    element: (
      useAuthStore.getState().isAuthenticated()
        ? <Navigate to={'/'} replace />
        : <RegisterPage />
    )
  }
]

const adminRoutes = [
  {
    path: '/manage-controlled-forms',
    element: <ManageControlledForms />
  },
  {
    path: '/manage-quality-records',
    element: <ManageQualityRecords />
  }
]

const adminAndHead = [
  {
    path: '/:dep',
    element: <Departments />
  },
  {
    path: '/:dep/faculty-lists/:id',
    element: <FacultyLists />,
  },
  {
    path: '/:dep/faculty-form-lists/:facultyId',
    element: <FacultyFormsList />
  },
  {
    path: '/:dep/faculty-records-lists/:facultyId',
    element: <FacultyRecordsLists />
  },
]


const documentRoutes = [
  {
    path: '/pending-controlled-forms',
    element: <PendingControlledForms />
  },
  {
    path: '/completed-controlled-forms',
    element: <CompletedControlledForms />
  },
  {
    path: '/pending-quality-records',
    element: <PendingQualityRecords />
  },
  {
    path: '/completed-quality-records',
    element: <CompletedQualityRecords />
  },
]


const allowedToAll = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
]


function App() {
  const setUser = useAuthStore((state) => state.setUser)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get<UserData>(`${import.meta.env.VITE_ENDPOINT}auth/get-current-user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        setUser(response.data)
        if (response.data.role) {
          localStorage.setItem('role', response.data.role)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (token) {
      getCurrentUser()
    }
  }, [token])

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes - For all users */}
        <Route element={<ProtectedRoute allowedRoles={['Faculty', 'Controller', 'Head', 'Custodians', 'Dean']} />}>
          <Route element={<Layout />}>
            {allowedToAll.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* Protected Routes - For all except Controller and Dean */}
        <Route element={<ProtectedRoute allowedRoles={['Faculty', 'Head', 'Custodians']} />}>
          <Route element={<Layout />}>
            {documentRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* Protected Routes - Controller Only */}
        <Route element={<ProtectedRoute allowedRoles={['Controller']} />}>
          <Route element={<Layout />}>
            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* Protected Routes - Dean and Head Only */}
        <Route element={<ProtectedRoute allowedRoles={['Dean', 'Head']} />}>
          <Route element={<Layout />}>
            {adminAndHead.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* Protected Routes - Dean */}
        <Route element={<ProtectedRoute allowedRoles={['Dean']} />}>
          <Route element={<Layout />}>
              <Route path="/activity-logs" element={<ActivityLogs />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
