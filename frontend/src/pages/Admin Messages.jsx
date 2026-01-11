import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Eye, Trash2, Edit, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/contacts');
      setMessages(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (message) => {
    setSelectedMessage(message);
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
          <span>Delete Message?</span>
        </div>
      ),
      message: (
        <div className="custom-confirm-dialog">
          <p className="text-gray-600">Are you sure you want to permanently delete this message?</p>
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
              await api.delete(`/contacts/${id}`);
              await fetchMessages();
              toast.success("Message deleted successfully!");
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
      <h1 className="text-2xl font-bold mb-6">Manage Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Date</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
            {messages.map((msg) => (
                <tr key={msg.id} className="border-t">
                  <td className="py-2">{msg.name}</td>
                  <td className="py-2">{msg.email}</td>
                  <td className="py-2">{msg.phone}</td>
                  <td className="py-2">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 space-x-3 flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      onClick={() => handleView(msg)}
                    >
                      <Eye size={16} />
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(msg.id)}
                      disabled={deleting === msg.id}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={16} />
                      {deleting === msg.id ? "Deleting..." : "Delete"}
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Message Details</h2>
            <div className="space-y-3">
              <p><strong>Name:</strong> {selectedMessage.name}</p>
              <p><strong>Email:</strong> {selectedMessage.email}</p>
              <p><strong>Phone:</strong> {selectedMessage.phone}</p>
              <p><strong>Message:</strong></p>
              <p className="bg-gray-100 p-3 rounded">{selectedMessage.message}</p>
              <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedMessage(null);
                }}
                className="px-4 py-2 rounded-md border"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
