import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Edit, Trash2, Plus, Code, Smartphone, Bot, Zap, Palette, TrendingUp, Share2, GraduationCap, Briefcase, BarChart3, Wifi } from "lucide-react";

// Available icons for services
const AVAILABLE_ICONS = [
  { name: 'code', label: 'Code', component: Code },
  { name: 'smartphone', label: 'Mobile', component: Smartphone },
  { name: 'bot', label: 'AI', component: Bot },
  { name: 'zap', label: 'Automation', component: Zap },
  { name: 'palette', label: 'Design', component: Palette },
  { name: 'trending-up', label: 'Marketing', component: TrendingUp },
  { name: 'share-2', label: 'Social Media', component: Share2 },
  { name: 'graduation-cap', label: 'Training', component: GraduationCap },
  { name: 'briefcase', label: 'Consultancy', component: Briefcase },
  { name: 'bar-chart-3', label: 'Data', component: BarChart3 },
  { name: 'wifi', label: 'IoT', component: Wifi },
];

// Icon name to component mapping
const getIconComponent = (iconName) => {
  const icon = AVAILABLE_ICONS.find(i => i.name === iconName);
  return icon ? icon.component : Code;
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newService, setNewService] = useState({ title: "", description: "", icon: "code" });
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/services', newService);
      await fetchServices();
      setNewService({ title: "", description: "", icon: "code" });
      setShowModal(false);
      toast.success("Service added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditService = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/services/${editingService.id}`, newService);
      await fetchServices();
      setNewService({ title: "", description: "", icon: "code" });
      setEditingService(null);
      setShowModal(false);
      toast.success("Service updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = (id) => {
    confirmAlert({
      title: (
        <div className="flex items-center gap-2">
          <svg className="warning-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Delete Service?</span>
        </div>
      ),
      message: (
        <div className="custom-confirm-dialog">
          <p className="text-gray-600">Are you sure you want to permanently delete this service?</p>
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
              await api.delete(`/services/${id}`);
              await fetchServices();
              toast.success("Service deleted successfully!");
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

  const openEditModal = (service) => {
    setNewService({ title: service.title, description: service.description, icon: service.icon || "code" });
    setEditingService(service);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} />
          Add New
        </motion.button>
      </div>

      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => {
            const IconComponent = getIconComponent(s.icon);
            return (
              <div key={s.id} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="w-6 h-6 text-accent" />
                  <h2 className="font-semibold">{s.title}</h2>
                </div>
                <p className="text-gray-500">{s.description}</p>
                <div className="mt-3 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => openEditModal(s)}
                  >
                    <Edit size={16} />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleDeleteService(s.id)}
                    disabled={deleting === s.id}
                  >
                    <Trash2 size={16} />
                    {deleting === s.id ? "Deleting..." : "Delete"}
                  </motion.button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
            <form onSubmit={editingService ? handleEditService : handleAddService} className="space-y-3">
              <input
                type="text"
                placeholder="Service Title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                className="w-full border p-2 rounded-md"
                required
              />
              <textarea
                placeholder="Service Description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="w-full border p-2 rounded-md"
                required
              />
              
              {/* Icon Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Icon</label>
                <div className="grid grid-cols-4 gap-2 p-2 border rounded-md">
                  {AVAILABLE_ICONS.map((iconOption) => {
                    const IconComponent = iconOption.component;
                    return (
                      <button
                        key={iconOption.name}
                        type="button"
                        onClick={() => setNewService({ ...newService, icon: iconOption.name })}
                        className={`p-2 rounded-md flex items-center justify-center transition-colors ${
                          newService.icon === iconOption.name
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        title={iconOption.label}
                      >
                        <IconComponent className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingService(null);
                    setNewService({ title: "", description: "", icon: "code" });
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
                  {saving ? 'Saving...' : editingService ? 'Update' : 'Save'}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

