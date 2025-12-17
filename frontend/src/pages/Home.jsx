import project1 from "../assets/images/project1.png";
import project2 from "../assets/images/project2.png";
import project3 from "../assets/images/project3.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";

const Home = () => {
const [project, setProject] = useState(0);
const [year, setYear] = useState(0);
const [client, setClient] = useState(0);
const [data, setData] = useState({"name":"","number":"","message":"","email":""});
const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

const [projectdata] = useState([
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
  const interval = setInterval(() => {
    setProject((prev) => (prev < 50 ? prev + 1 : prev));
    setYear((prev) => (prev < 5 ? prev + 1 : prev));
    setClient((prev) => (prev < 30 ? prev + 1 : prev));
  }, 50);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const calculateCountdown = () => {
    const now = new Date().getTime();
    const currentYear = new Date().getFullYear();
    
    // Set target date to December 25th of current year
    let targetDate = new Date(currentYear, 11, 25, 0, 0, 0).getTime();
    
    // If it's already past December 25th this year, target next year's December 25th
    if (now > targetDate) {
      targetDate = new Date(currentYear + 1, 11, 25, 0, 0, 0).getTime();
    }
    
    const difference = targetDate - now;
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }
  };

  // Calculate immediately
  calculateCountdown();
  
  // Update every second
  const countdownInterval = setInterval(calculateCountdown, 1000);
  
  return () => clearInterval(countdownInterval);
}, []);

  const stats = [
    { value: `${project}+`, label: "Projects Completed" },
    { value: `${year}+`, label: "Years Experience" },
    { value: `${client}+`, label: "Happy Clients" },
  ];

  const features = [
    { title: "Quick Turnaround", desc: "Fast project delivery without compromising quality." },
    { title: "24/7 Support", desc: "Always available to solve your queries." },
    { title: "Affordable Pricing", desc: "High-quality solutions at competitive rates." },
    { title: "Skilled Team", desc: "Experienced developers & designers." },
    { title: "Global Clients", desc: "Serving businesses across industries." },
  ];

  const services = [
    { id: "web-dev", title: "Web Development", desc: "Custom, scalable, and modern web applications." },
    { id: "mobile-dev", title: "Mobile Apps", desc: "iOS, Android & cross-platform solutions." },
    { id: "automation", title: "Automation & AI", desc: "Automate workflows and boost productivity." },
  ];

  const HandleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted with data:", data);
    alert("Message sent successfully!");
    setData({"name":"","number":"","message":"","email":""})
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bgname text-white pt-18 pb-20 overflow-hidden">
        <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">

          {/* Left Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight"
            >
              Building <span className="text-accent">Digital Solutions </span>
              That Drive Growth
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-body max-w-lg"
            >
              We craft high-performing web, mobile, and AI-powered solutions that help businesses scale and succeed in the digital era.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 items-center"
            >
              <Link to="/services" className="btn-primary">
                Explore Services
              </Link>
              <Link to="/contact" className="btn-outline">
                Get in Touch
              </Link>
              <div className="relative flex flex-col items-center gap-2">
                <Link to="https://christmas-offer.vercel.app" className="btn-xmas text-2xl">
                 Chritmas Offer
                </Link>
                <div className="absolute top-18 text-xl text-accent font-semibold bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                  <div className="flex gap-2">
                    <span>{countdown.days}d</span>
                    <span>{countdown.hours}h</span>
                    <span>{countdown.minutes}m</span>
                    <span>{countdown.seconds}s</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content (Contact Box Instead of Image) */}
          <div className="relative flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bgcard rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-2xl font-bold text-accent mb-4">Get in Touch</h3>
              <p className="text-body mb-6 font-semibold">
                Have an idea or project in mind? Let’s talk and bring it to life.
              </p>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={HandleChange}
                  placeholder="Your Name"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent font-semibold"
                />
                <input
                  name="number"
                  maxLength={10}
                  minLength={10}
                  value={data.number}
                  type="tel"
                  onChange={HandleChange}
                  placeholder="Mobile Number"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent font-semibold"
                />
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={HandleChange}
                  placeholder="Your Email"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent font-semibold"
                />
                <textarea
                  name="message"
                  value={data.message}
                  placeholder="Your Message"
                  onChange={HandleChange}
                  rows="3"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent font-semibold"
                ></textarea>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

        </div>

        {/* Background Overlay Shape */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900/30 via-transparent to-accent/10"></div>
      </section>


      {/* Stats Section */}
      <section className="bg-gray-100 py-12 bgname">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-accent">{s.value}</h2>
              <p className="text-body">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50 bgname">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-white">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            {services.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bgcard shadow-md rounded-xl p-6 hover:scale-105 transition-transform"
              >
                <h3 className="text-lg sm:text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-body">{s.desc}</p>
                <Link className="mt-4 inline-block font-semibold text-accent hover:underline">
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */} 
      <section className="py-16 px-6 bgname">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectdata.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bgcard shadow-lg rounded-xl overflow-hidden hover:scale-103 transition-transform"
            >
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover hover:scale-105 transition-transform" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/portfolio" className="btn-primary">
            View All Projects
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white bgname">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">Why Choose Reimvibe?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bgcard shadow-md p-6 rounded-xl hover:scale-103 transition-transform"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-accent">{f.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-body">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bgname text-white py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Ready to Start Your Project?
        </h2>
        <p className="mt-4 text-sm sm:text-base text-body">
          Let’s build something amazing together with Reimvibe Technologies.
        </p>
        <Link to="/contact" className="btn-primary mt-6 inline-block">
          Contact Us
        </Link>
      </section>
    </>
  );
}

export default Home;