import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminMainLayout from "../layouts/AdminMainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Careers from "../pages/Careers";
import Contact from "../pages/Contact";
import Portfolio from "../pages/Portfolio";
import Services from "../pages/Services";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import JobForm from "../pages/JobForm";
import JobView from "../pages/JobView";
import Applications from "../pages/Admin Applications";
import Messages from "../pages/Admin Messages";
import Projects from "../pages/Admin Projects";
import AdminServices from "../pages/Admin Services";
// import AdminSettings from "../pages/Admin Settings";
import AdminNotFound from "../pages/Admin NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="services" element={<Services />} />
      </Route>
      <Route path="*" element={<NotFound />} />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminMainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/add" element={<JobForm />} />
        <Route path="jobs/edit/:id" element={<JobForm />} />
        <Route path="jobs/view/:id" element={<JobView />} />
        <Route path="applications" element={<Applications />} />
        <Route path="messages" element={<Messages />} />
        <Route path="projects" element={<Projects />} />
        <Route path="services" element={<AdminServices />} />
        {/* <Route path="settings" element={<AdminSettings />} /> */}
        <Route path="*" element={<AdminNotFound />} />
      </Route>
    </Routes>
  );
}
