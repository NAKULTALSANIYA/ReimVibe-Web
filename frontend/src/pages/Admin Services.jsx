import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Edit, Trash2, Plus, Eye, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newService, setNewService] = useState({ title: "", description: "" });
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
      setNewService({ title: "", description: "" });
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
      await api.put(`/services/${editingService._id}`, newService);
      await fetchServices();
      setNewService({ title: "", description: "" });
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
      title: "Confirm Delete",
      message: "Are you sure you want to delete this service?",
      buttons: [
        {
          label: "Yes",
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
          label: "No",
        },
      ],
    });
  };

  const openEditModal = (service) => {
    setNewService({ title: service.title, description: service.description });
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
          {services.map((s) => (
            <div key={s._id} className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="font-semibold">{s.title}</h2>
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
                  onClick={() => handleDeleteService(s._id)}
                  disabled={deleting === s._id}
                >
                  <Trash2 size={16} />
                  {deleting === s._id ? "Deleting..." : "Delete"}
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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

              <div className="flex justify-end gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingService(null);
                    setNewService({ title: "", description: "" });
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
