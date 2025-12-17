import { motion } from "framer-motion";
import React from "react";

function Contact() {
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
          Get in <span className="text-accent">Touch</span>
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-300">
          Have a project idea or a query? We’d love to hear from you.
          Let’s build something <span className="text-accent font-semibold">amazing</span> together!
        </p>
      </section>

      {/* Contact Info */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "📍 Address", detail: "RK iconic, B-729, 150 Feet Ring Rd, opposite Rk World Tower, Puneet Nagar, Bajrang Wadi, Rajkot, Gujarat 360006" },
            { title: "📞 Phone", detail: "+91 75730 80196" },
            { title: "✉️ Email", detail: "info@reimvibetechnologies.com" },
          ].map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bgcard rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-accent">
                {info.title}
              </h3>
              <p className="mt-3 text-gray-300">{info.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Single Form Section */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-accent">
          Send Us a Message
        </h2>
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bgcard rounded-xl p-8 space-y-6"
        >
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input
            name="name"
            type="text"
            className="mt-2 w-full px-4 py-3 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Your Name"
            required
          />

          <label className="block text-sm font-medium text-gray-300">Mobile</label>
          <input
            name="number"
            type="tel"
            maxLength={10}
            minLength={10}
            className="mt-2 w-full px-4 py-3 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Your Mobile Number"
            required
          />

          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            className="mt-2 w-full px-4 py-3 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Your Email"
            required
          />

          <label className="block text-sm font-medium text-gray-300">Message</label>
          <textarea
            name="message"
            rows="5"
            className="mt-2 w-full px-4 py-3 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Your Message"
            required
          ></textarea>

          <button
            type="submit"
            className="btn-primary w-full"
          >Send Message
          </button>
        </motion.form>
      </section>

      {/* Google Map */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-accent">
            Find Us Here
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg border-2 border-yellow-400"
          >
            <iframe
              title="Reimvibe Technologies Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3042.115609680945!2d70.76534697427901!3d22.319317442207804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c9ebb58c4579%3A0x78530cb0edf1cfb0!2sRK%20Iconic!5e1!3m2!1sen!2sin!4v1762164867932!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;