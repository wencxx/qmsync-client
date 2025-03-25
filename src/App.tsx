import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./routes/protected-routes";
import Layout from "./layout/layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
// documents
import CompletedControlForms from "./pages/documents/completed-control-form";
// courses
import DepartmentOfArchitecture from "./pages/courses/DOA";
// manage docs
import ManageControlledForms from '@/pages/manage-documents/controlled-form'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

        {/* Protected Routes */}
        {/* <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}> */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/completed-control-forms" element={<CompletedControlForms />} />
            <Route path="/manage-controlled-forms" element={<ManageControlledForms />} />
            <Route path="/deparment-of-architectures" element={<DepartmentOfArchitecture />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
