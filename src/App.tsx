import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/autStore";
import ProtectedRoute from "./routes/protected-routes";
import Layout from "./layout/layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Unauthorized from "./pages/Unauthorized";
import HomePage from "./pages/home";
// documents
import PendingControlledForms from "./pages/documents/pending-control-form";
import CompletedControlledForms from "./pages/documents/completed-control-form";
// courses
import DepartmentOfArchitecture from "./pages/courses/DOA";
// manage docs
import ManageControlledForms from '@/pages/manage-documents/controlled-form'

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

const privateRoutes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/pending-controlled-forms',
    element: <PendingControlledForms />
  },
  {
    path: '/completed-controlled-forms',
    element: <CompletedControlledForms />
  },
  {
    path: '/manage-controlled-forms',
    element: <ManageControlledForms />
  },
  {
    path: '/deparment-of-architectures',
    element: <DepartmentOfArchitecture />
  },
]


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["Admin", "Owner"]} />}>
          <Route element={<Layout />}>
            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
