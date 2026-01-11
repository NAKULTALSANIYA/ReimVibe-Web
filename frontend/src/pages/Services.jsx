import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Smartphone, Bot, Zap, Palette, TrendingUp, Share2, GraduationCap, Briefcase, BarChart3, Wifi } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../utils/api";

// Icon name to component mapping
const ICON_MAP = {
  code: Code,
  smartphone: Smartphone,
  bot: Bot,
  zap: Zap,
  palette: Palette,
  'trending-up': TrendingUp,
  'share-2': Share2,
  'graduation-cap': GraduationCap,
  briefcase: Briefcase,
  'bar-chart-3': BarChart3,
  wifi: Wifi,
};

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchServices();
  }, []);

  // Get icon component dynamically based on service icon field
  const getIcon = (iconName) => {
    const IconComponent = ICON_MAP[iconName] || Code;
    return <IconComponent className="w-10 h-10 text-accent" />;
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
          Our <span className="text-accent">Services</span>
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200">
          We offer cutting-edge digital solutions to help businesses thrive in the modern era.
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
          <p className="text-gray-400">Loading services...</p>
        </div>
      )}

      {/* Service Cards */}
      {!loading && !error && (
        <section className="py-16">
          {services.length === 0 ? (
            <div className="container mx-auto px-6 text-center">
              <p className="text-gray-400">No services available at the moment.</p>
            </div>
          ) : (
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <motion.div
                  key={s.id || i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bgcard rounded-xl p-6 text-center hover:scale-105 transition-transform hover:shadow-accent"
                >
                  <div className="flex justify-center mb-4">
                    {getIcon(s.icon)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-accent">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-gray-200 text-sm sm:text-base">
                    {s.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Call To Action */}
      <section className="bgcard py-16 text-center rounded-2xl mx-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-accent">
          Let's Build Your Next Project!
        </h2>
        <p className="mt-4 text-gray-200">
          From websites to mobile apps, we deliver excellence in every project.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block btn-primary text-white px-8 py-3 rounded-full font-semibold transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}

export default Services;

