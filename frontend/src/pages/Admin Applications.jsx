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
      title: (
        <div className="flex items-center gap-2">
          <svg className="warning-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Delete Application?</span>
        </div>
      ),
      message: (
        <div className="custom-confirm-dialog">
          <p className="text-gray-600">Are you sure you want to permanently delete this application?</p>
          <p className="text-sm text-gray-400 mt-2">This action cannot be undone.</p>
        </div>
      ),
      buttons: [
        {
          label: (
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Delete
            </span>
          ),
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
          label: (
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </span>
          ),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      overlayClassName: "confirm-overlay",
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
