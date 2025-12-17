import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../utils/api";

export default function Dashboard() {
  const [stats, setStats] = useState([
    { label: "Total Jobs", value: 0 },
    { label: "Applications", value: 0 },
    { label: "Projects", value: 0 },
    { label: "Services", value: 0 },
    { label: "Messages", value: 0 },
  ]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardColors = ["bg-yellow-100 text-yellow-800", "bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-purple-100 text-purple-800", "bg-red-100 text-red-800"];

  useEffect(() => {
    DashboardData();
  }, []);

  const  DashboardData = async () => {
    try {
      const [jobsRes, applicationsRes, projectsRes, servicesRes, contactsRes] = await Promise.all([
        api.get('/jobs'),
        api.get('/applications'),
        api.get('/projects'),
        api.get('/services'),
        api.get('/contacts')
      ]);

      const jobs = jobsRes.data.data || [];
      const applications = applicationsRes.data.data || [];
      const projects = projectsRes.data.data || [];
      const services = servicesRes.data.data || [];
      const contacts = contactsRes.data.data || [];

      const jobsCount = jobs.length;
      const applicationsCount = applications.length;
      const projectsCount = projects.length;
      const servicesCount = services.length;
      const contactsCount = contacts.length;

      setStats([
        { label: "Total Jobs", value: jobsCount },
        { label: "Applications", value: applicationsCount },
        { label: "Projects", value: projectsCount },
        { label: "Services", value: servicesCount },
        { label: "Messages", value: contactsCount },
      ]);

      // Group data by month
      const groupByMonth = (data, dateField) => {
        const grouped = {};
        data.forEach(item => {
          const date = new Date(item[dateField]);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          grouped[monthKey] = (grouped[monthKey] || 0) + 1;
        });
        return grouped;
      };

      const jobsByMonth = groupByMonth(jobs, 'createdAt');
      const projectsByMonth = groupByMonth(projects, 'createdAt');

      // Get last 6 months
      const now = new Date();
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleString('default', { month: 'short' });
        months.push({
          name: monthName,
          jobs: jobsByMonth[monthKey] || 0,
          projects: projectsByMonth[monthKey] || 0
        });
      }

      setChartData(months);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {loading ? (
        <p>Loading dashboard data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl shadow-md ${cardColors[i % cardColors.length]}`}
              >
                <h2 className="text-2xl font-bold">{s.value}</h2>
                <p className="text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Jobs vs Projects (Monthly)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jobs" fill="#facc15" />
                <Bar dataKey="projects" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
