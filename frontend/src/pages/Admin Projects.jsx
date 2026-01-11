import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Edit, Trash2, Plus, ExternalLink, Upload, X } from "lucide-react";

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
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to server
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/projects/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imageUrl;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to upload image');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = formProject.image;

      // Upload image if a file was selected
      if (selectedFile) {
        setUploading(true);
        imageUrl = await uploadImage(selectedFile);
        setUploading(false);
      }

      if (!imageUrl) {
        toast.error('Project image is required');
        setSaving(false);
        setUploading(false);
        return;
      }

      const projectData = {
        ...formProject,
        image: imageUrl
      };

      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, projectData);
        toast.success("Project updated successfully!");
      } else {
        await api.post('/projects', projectData);
        toast.success("Project added successfully!");
      }
      
      await fetchProjects();
      resetForm();
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormProject({ title: "", description: "", image: "", link: "" });
    setEditingProject(null);
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleEdit = (project) => {
    setFormProject({
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link
    });
    setEditingProject(project);
    setImagePreview(project.image);
    setSelectedFile(null);
    setShowModal(true);
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
          <span>Delete Project?</span>
        </div>
      ),
      message: (
        <div className="custom-confirm-dialog">
          <p className="text-gray-600">Are you sure you want to permanently delete this project?</p>
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

  // Clear selected file and preview
  const clearImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormProject({ ...formProject, image: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
            resetForm();
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
            <div key={p.id} className="bg-white p-4 rounded-xl shadow-md">
              {p.image && (
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-40 object-cover rounded-md mb-3"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
              )}
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
                    onClick={() => handleDelete(p.id)}
                    disabled={deleting === p.id}
                  >
                    <Trash2 size={16} />
                    {deleting === p.id ? "Deleting..." : "Delete"}
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg max-h-[90vh] overflow-y-auto">
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
              
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative mb-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* File Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <Upload size={16} />
                    {selectedFile ? 'Change Image' : 'Upload Image'}
                  </label>
                  {selectedFile && (
                    <span className="text-sm text-gray-500 truncate max-w-[150px]">
                      {selectedFile.name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Supported: JPEG, PNG, GIF, WebP (Max 5MB)</p>
              </div>

              {/* URL Input (alternative) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Or Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={formProject.image}
                  onChange={(e) => {
                    setFormProject({ ...formProject, image: e.target.value });
                    setImagePreview(e.target.value);
                    setSelectedFile(null);
                  }}
                  className="w-full border p-2 rounded-md"
                />
              </div>

              <input
                type="url"
                placeholder="Live Project Link"
                value={formProject.link}
                onChange={(e) => setFormProject({ ...formProject, link: e.target.value })}
                className="w-full border p-2 rounded-md"
              />
              <div className="flex justify-end gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={saving || uploading}
                  className="bg-yellow-400 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : saving ? (
                    'Saving...'
                  ) : editingProject ? (
                    'Update'
                  ) : (
                    'Save'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

