import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

export default function JobView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      navigate("/admin/jobs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Job Details</h1>
        <button
          className="bg-gray-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-300"
          onClick={() => navigate("/admin/jobs")}
        >
          Back
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">{job.title}</h2>
        <p><strong>Type:</strong> {job.type}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Description:</strong></p>
        <p className="whitespace-pre-wrap">{job.description}</p>
      </div>
    </div>
  );
}
