import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Trash2, Edit, Plus, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications');
      if (response.data.data) {
        setApplications(response.data.data);
      } else {
        setApplications([]);
        setError(response.data.message || 'No applications found');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingStatus(id);
    try {
      await api.put(`/applications/${id}/status`, { status: newStatus });
      await fetchApplications();
      toast.success("Application status updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this application?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setDeleting(id);
            try {
              await api.delete(`/applications/${id}`);
              await fetchApplications();
              toast.success("Application deleted successfully!");
            } catch (err) {
              toast.error(err.response?.data?.message || err.message);
            } finally {
              setDeleting(null);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Applications</h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Job</th>
                <th className="py-2">Date & Time</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="py-2">{app.name}</td>
                  <td className="py-2">{app.email}</td>
                  <td className="py-2">{app.jobId?.title || 'N/A'}</td>
                  <td className="py-2">{new Date(app.createdAt).toLocaleString()}</td>
                  <td className="py-2">
                    <motion.select
                      value={app.status}
                      onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                      disabled={updatingStatus === app._id}
                      className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </motion.select>
                  </td>
                  <td className="py-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(app._id)}
                      disabled={deleting === app._id}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={16} />
                      {deleting === app._id ? "Deleting..." : "Delete"}
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
