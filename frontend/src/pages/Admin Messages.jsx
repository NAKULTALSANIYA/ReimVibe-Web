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
      title: "Confirm Delete",
      message: "Are you sure you want to delete this message?",
      buttons: [
        {
          label: "Yes",
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
          label: "No",
        },
      ],
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
                <tr key={msg._id} className="border-t">
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
                      onClick={() => handleDelete(msg._id)}
                      disabled={deleting === msg._id}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={16} />
                      {deleting === msg._id ? "Deleting..." : "Delete"}
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
