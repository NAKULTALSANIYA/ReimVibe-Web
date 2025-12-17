import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import api from "../utils/api";

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      if (response.data.data) {
        setJobs(response.data.data);
      } else {
        setJobs([]);
        setError(response.data.message || 'No jobs found');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Job
  const handleDelete = async (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this job?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setDeleting(id);
            try {
              await api.delete(`/jobs/${id}`);
              toast.success("Job deleted successfully!");
              await fetchJobs();
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Jobs</h1>
        <button
          className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300"
          onClick={() => navigate("/admin/jobs/add")}
        >
          + Add New
        </button>
      </div>

      {/* Jobs Table */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Title</th>
                <th className="py-2">Type</th>
                <th className="py-2">Location</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, i) => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-t"
                >
                  <td className="py-2">{job.title}</td>
                  <td className="py-2">{job.type}</td>
                  <td className="py-2">{job.location}</td>
                  <td className="py-2">{job.status}</td>
                  <td className="py-2 space-x-3">
                    <button className="text-blue-500 hover:underline" onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}>
                      <Edit />
                    </button>
                    <button
                      className="text-red-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleDelete(job._id)}
                      disabled={deleting === job._id}
                    >
                      {deleting === job._id ? "Deleting..." : <Trash2 />}
                    </button>
                    <button className="text-green-500 hover:underline" onClick={() => navigate(`/admin/jobs/view/${job._id}`)}>
                      <Eye />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


    </div>
  );
}