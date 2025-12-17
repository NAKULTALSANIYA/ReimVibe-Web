import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import brainstrom from "../assets/images/brainstrom.jpeg";
import culture from "../assets/images/Collaborative-Work-Culture.jpeg";
import milestones from "../assets/images/milestones.jpeg";
import funatwork from "../assets/images/funatwork.jpeg";
import workspace from "../assets/images/Creative-Workspace.jpeg";
import together from "../assets/images/together.jpeg";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

function Careers() {
  const benefits = [
    { title: "Growth Opportunities", desc: "We provide training, mentorship, and career advancement paths." },
    { title: "Flexible Work Culture", desc: "Hybrid and remote work options to maintain work-life balance." },
    { title: "Exciting Projects", desc: "Work on impactful projects for global clients across industries." },
    { title: "Supportive Team", desc: "Collaborate with a passionate and friendly team of experts." },
  ];

  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobData(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setJobData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/applications', {
        ...applicationData,
        jobId: selectedJob._id
      });
      toast.success('Application submitted successfully!');
      setApplicationData({ name: "", email: "", phone: "", resume: "" });
      setShowApplicationModal(false);
      setSelectedJob(null);
    } catch (err) {
      toast.error('Failed to submit application: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const lifeAtDivineVibe = [
    { img: brainstrom, caption: "Brainstorming New Ideas 💡" },
    { img: culture, caption: "Collaborative Work Culture 🤝" },
    { img: milestones, caption: "Celebrating Milestones 🎉" },
    { img: funatwork, caption: "Fun at Work 😎" },
    { img: workspace, caption: "Creative Workspace 🎨" },
    { img: together, caption: "Together We Achieve 🚀" },
  ];

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
          Join Our <span className="text-accent ">Team</span>
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200">
          Be a part of <span className="text-accent font-semibold">Reimvibe Technologies</span> where innovation meets opportunity.  
          Let’s grow and build the future together.
        </p>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 container mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-accent ">
          Why Work With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bgcard rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-accent ">{b.title}</h3>
              <p className="mt-3 text-gray-200 text-sm sm:text-base">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      {/* <section className="py-16 container mx-auto px-6">
        <h2 className="text-2x7l sm:text-3xl font-bold text-center mb-10 text-accent ">
          Open Positions
        </h2>
        {loading ? (
          <p className="text-center">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobData.map((job, i) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bgcard rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-accent ">{job.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{job.type} | {job.location}</p>
                  <p className="mt-3 text-gray-200 text-sm sm:text-base">{job.description}</p>
                </div>
                <button
                  onClick={() => handleApply(job)}
                  className="mt-6 inline-block btn-primary text-white px-5 py-2 rounded-full font-semibold transition"
                >
                  Apply Now →
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </section> */}

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-yellow-400 p-6 rounded-xl w-96 shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-white">Apply for {selectedJob.title}</h2>
            <form onSubmit={handleApplicationSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={applicationData.name}
                onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-md placeholder-gray-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={applicationData.email}
                onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-md placeholder-gray-400"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={applicationData.phone}
                onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-md placeholder-gray-400"
                required
              />
              <input
                type="url"
                placeholder="Resume URL (optional)"
                value={applicationData.resume}
                onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.value })}
                className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-md placeholder-gray-400"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowApplicationModal(false);
                    setSelectedJob(null);
                    setApplicationData({ name: "", email: "", phone: "", resume: "" });
                  }}
                  className="px-4 py-2 rounded-md border border-gray-600 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-yellow-400 px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Life at ReimVibe */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-accent ">
          Life at ReimVibe 🌟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lifeAtDivineVibe.map((life, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={life.img}
                alt={life.caption}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <p className="text-white text-lg font-semibold">{life.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Careers;
