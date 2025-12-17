import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import project1 from "../assets/images/project1.png";
import project2 from "../assets/images/project2.png";
import project3 from "../assets/images/project3.jpg";
import api from "../utils/api";
import { Link } from "react-router-dom";

function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      image: project1
    },
    {
      id: 2,
      title: "School Website",
      image: project2
    },
    {
      id: 3,
      title: "Restaurant Management System",
      image: project3
    }
  ]);

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
          A glimpse into the projects we’ve delivered with innovation & precision.
        </p>
      </section>

      {/* Project Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p._id}
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
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <p className="text-accent font-semibold">View Project</p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-accent">
                  {p.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Call To Action */}
      <section className="bgcard py-16 text-center rounded-2xl mx-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-accent">
          Want Your Project Here Next?
        </h2>
        <p className="mt-4 text-gray-200">
          Let’s collaborate and bring your ideas to life.
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
