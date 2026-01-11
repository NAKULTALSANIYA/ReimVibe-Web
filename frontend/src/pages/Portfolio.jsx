import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
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
    fetchProjects();
  }, []);

  // Handle image load error
  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  return (
    <div className="bgname text-white">
      {/* Hero Section */}
      <section className="py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
        >
          Our <span className="text-accent ">Portfolio</span>
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200">
          A glimpse into the projects we've delivered with innovation & precision.
        </p>
      </section>

      {/* Error State */}
      {error && (
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-400 mb-4">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      )}

      {/* Project Grid */}
      {!loading && !error && (
        <section className="py-16 container mx-auto px-6">
          {projects.length === 0 ? (
            <p className="text-center text-gray-400">No projects available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="bgcard rounded-xl overflow-hidden group relative hover:scale-105 transition-transform"
                >
                  <div className="relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-48 object-cover"
                      onError={() => handleImageError(p.id)}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-accent">
                      {p.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">{p.description}</p>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-yellow-400 hover:underline"
                      >
                        View Live →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Call To Action */}
      <section className="bgcard py-16 text-center rounded-2xl mx-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-accent">
          Want Your Project Here Next?
        </h2>
        <p className="mt-4 text-gray-200">
          Let's collaborate and bring your ideas to life.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block btn-primary text-white px-8 py-3 rounded-full font-semibold transition"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}

export default Portfolio;

