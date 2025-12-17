import { motion } from "framer-motion";
import aboutImg from "../assets/images/reimvibes-logo.jpg";
import { useState,react } from "react";

function About() {
  const [loading, setLoading] = useState(false);

  const values = [
    { title: "Innovation", desc: "We deliver modern, cutting-edge digital solutions that transform businesses." },
    { title: "Integrity", desc: "We build long-term trust by being transparent and reliable." },
    { title: "Excellence", desc: "We focus on quality in every step of design and development." },
    { title: "Customer First", desc: "Your success is our priority—we work as an extended part of your team." },
  ];

  return (
    <div className="bgname text-white">
      {/* Hero Section */}
      <section className="py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
        >
          About <span className="text-accent ">Reimvibe Technologies</span>
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200">
          We are a passionate team dedicated to empowering businesses with digital solutions
          that create impact and drive growth.
        </p>
      </section>

      {/* Company Overview */}
      <section className="py-16 container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <img
            src={aboutImg}
            alt="About Reimvibe Technologies"
            className="rounded-2xl w-full max-w-md mx-auto shadow-lg shadow-accent/40"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-accent ">Who We Are</h2>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
            At <span className="font-semibold text-accent ">Reimvibe Technologies</span>, 
            we specialize in creating modern web, mobile, and automation solutions tailored 
            to your business needs.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-16 bgcard">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-accent ">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bgname shadow-md rounded-xl p-6 hover:scale-105 transition-transform hover:shadow-accent"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-accent ">{v.title}</h3>
                <p className="mt-3 text-gray-200 text-sm sm:text-base">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 container mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-accent ">Meet Our Team</h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed"
        >
          Our diverse team of passionate professionals brings together expertise in web development,
          mobile applications, AI automation, and user experience design. With years of combined
          experience and a shared commitment to innovation, we collaborate seamlessly to deliver
          exceptional digital solutions that drive real business results for our clients.
        </motion.p>
      </section>
    </div>
  );
}

export default About;
