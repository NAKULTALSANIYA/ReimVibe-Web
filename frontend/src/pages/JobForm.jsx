import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

export default function JobForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [formJob, setFormJob] = useState({ title: "", type: "", location: "", description: "", status: "Open" });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      setFormJob({
        title: response.data.title,
        type: response.data.type,
        location: response.data.location,
        description: response.data.description,
        status: response.data.status
      });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      navigate("/admin/jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/jobs/${id}`, formJob);
        toast.success("Job updated successfully!");
      } else {
        await api.post('/jobs', formJob);
        toast.success("Job added successfully!");
      }
      navigate("/admin/jobs");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{isEdit ? "Edit Job" : "Add New Job"}</h1>
        <button
          className="bg-gray-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-300"
          onClick={() => navigate("/admin/jobs")}
        >
          Back
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            value={formJob.title}
            onChange={(e) => setFormJob({ ...formJob, title: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
          <select
            value={formJob.type}
            onChange={(e) => setFormJob({ ...formJob, type: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            value={formJob.location}
            onChange={(e) => setFormJob({ ...formJob, location: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
          <textarea
            placeholder="Job Description"
            value={formJob.description}
            onChange={(e) => setFormJob({ ...formJob, description: e.target.value })}
            className="w-full border p-2 rounded-md"
            rows="4"
            required
          />
          <select
            value={formJob.status}
            onChange={(e) => setFormJob({ ...formJob, status: e.target.value })}
            className="w-full border p-2 rounded-md"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              className="px-4 py-2 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-yellow-400 px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
