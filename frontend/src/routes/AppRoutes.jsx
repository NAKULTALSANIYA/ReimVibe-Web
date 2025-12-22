
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import AdminMainLayout from "../layouts/AdminMainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy load all page components for code splitting
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Careers = lazy(() => import("../pages/Careers"));
const Contact = lazy(() => import("../pages/Contact"));
const Portfolio = lazy(() => import("../pages/Portfolio"));
const Services = lazy(() => import("../pages/Services"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Jobs = lazy(() => import("../pages/Jobs"));
const JobForm = lazy(() => import("../pages/JobForm"));
const JobView = lazy(() => import("../pages/JobView"));
const Applications = lazy(() => import("../pages/Admin Applications"));
const Messages = lazy(() => import("../pages/Admin Messages"));
const Projects = lazy(() => import("../pages/Admin Projects"));
const AdminServices = lazy(() => import("../pages/Admin Services"));
const AdminNotFound = lazy(() => import("../pages/Admin NotFound"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        } />
        <Route path="about" element={
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        } />
        <Route path="careers" element={
          <Suspense fallback={<PageLoader />}>
            <Careers />
          </Suspense>
        } />
        <Route path="contact" element={
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        } />
        <Route path="portfolio" element={
          <Suspense fallback={<PageLoader />}>
            <Portfolio />
          </Suspense>
        } />
        <Route path="services" element={
          <Suspense fallback={<PageLoader />}>
            <Services />
          </Suspense>
        } />
      </Route>

      {/* Public Login Route */}
      <Route path="/login" element={
        <Suspense fallback={<PageLoader />}>
          <Login />
        </Suspense>
      } />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminMainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="jobs" element={
          <Suspense fallback={<PageLoader />}>
            <Jobs />
          </Suspense>
        } />
        <Route path="jobs/add" element={
          <Suspense fallback={<PageLoader />}>
            <JobForm />
          </Suspense>
        } />
        <Route path="jobs/edit/:id" element={
          <Suspense fallback={<PageLoader />}>
            <JobForm />
          </Suspense>
        } />
        <Route path="jobs/view/:id" element={
          <Suspense fallback={<PageLoader />}>
            <JobView />
          </Suspense>
        } />
        <Route path="applications" element={
          <Suspense fallback={<PageLoader />}>
            <Applications />
          </Suspense>
        } />
        <Route path="messages" element={
          <Suspense fallback={<PageLoader />}>
            <Messages />
          </Suspense>
        } />
        <Route path="projects" element={
          <Suspense fallback={<PageLoader />}>
            <Projects />
          </Suspense>
        } />
        <Route path="services" element={
          <Suspense fallback={<PageLoader />}>
            <AdminServices />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<PageLoader />}>
            <AdminNotFound />
          </Suspense>
        } />
      </Route>

      {/* Catch-all 404 - MUST BE LAST */}
      <Route path="*" element={
        <Suspense fallback={<PageLoader />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
}
