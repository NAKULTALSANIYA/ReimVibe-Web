import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Edit, Trash2, Plus, ExternalLink, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formProject, setFormProject] = useState({
    title: "",
    description: "",
    image: "",
    link: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, formProject);
        toast.success("Project updated successfully!");
      } else {
        await api.post('/projects', formProject);
        toast.success("Project added successfully!");
      }
      await fetchProjects();
      setFormProject({ title: "", description: "", image: "", link: "" });
      setEditingProject(null);
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setFormProject({
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link
    });
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this project?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setDeleting(id);
            try {
              await api.delete(`/projects/${id}`);
              await fetchProjects();
              toast.success("Project deleted successfully!");
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
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center gap-2"
          onClick={() => {
            setFormProject({ title: "", description: "", image: "", link: "" });
            setEditingProject(null);
            setShowModal(true);
          }}
        >
          <Plus size={16} />
          Add New
        </motion.button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded-xl shadow-md">
              {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-md mb-3" />}
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-gray-500 text-sm">{p.description}</p>

              <div className="mt-3 flex justify-between items-center">
                {p.link && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <ExternalLink size={16} />
                    Live
                  </motion.a>
                )}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => handleEdit(p)}
                  >
                    <Edit size={16} />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleDelete(p._id)}
                    disabled={deleting === p._id}
                  >
                    <Trash2 size={16} />
                    {deleting === p._id ? "Deleting..." : "Delete"}
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{editingProject ? "Edit Project" : "Add New Project"}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                type="text"
                placeholder="Project Title"
                value={formProject.title}
                onChange={(e) => setFormProject({ ...formProject, title: e.target.value })}
                className="w-full border p-2 rounded-md"
                required
              />
              <textarea
                placeholder="Project Description"
                value={formProject.description}
                onChange={(e) => setFormProject({ ...formProject, description: e.target.value })}
                className="w-full border p-2 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formProject.image}
                onChange={(e) => setFormProject({ ...formProject, image: e.target.value })}
                className="w-full border p-2 rounded-md"
                required
              />
              <input
                type="url"
                placeholder="Live Project Link"
                value={formProject.link}
                onChange={(e) => setFormProject({ ...formProject, link: e.target.value })}
                className="w-full border p-2 rounded-md"
                required
              />
              <div className="flex justify-end gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProject(null);
                    setFormProject({ title: "", description: "", image: "", link: "" });
                  }}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={saving}
                  className="bg-yellow-400 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : editingProject ? "Update" : "Save"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
