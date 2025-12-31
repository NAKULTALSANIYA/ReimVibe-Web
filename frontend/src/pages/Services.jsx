import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Smartphone, Bot, Zap, Palette, TrendingUp, Share2, GraduationCap, Briefcase, BarChart3 } from "lucide-react";
import { useState,React} from "react";

function Services() {
   const [services] = useState([
    {
      id: 1,
      title: "Web Development",
      description: "Custom, scalable, and modern web applications built with the latest technologies."
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "iOS, Android & cross-platform mobile solutions for seamless user experiences."
    },
    {
      id: 3,
      title: "AI Development",
      description: "Cutting-edge artificial intelligence solutions tailored to your business needs."
    },
    {
      id: 4,
      title: "Automation",
      description: "Process automation to streamline workflows and improve operational efficiency."
    },
    {
      id: 5,
      title: "Graphic Designing",
      description: "Creative visual designs that captivate audiences and strengthen brand identity."
    },
    {
      id: 6,
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns to boost your online presence and reach."
    },
    {
      id: 7,
      title: "Social Media Marketing",
      description: "Engaging content and strategies to grow your social media presence and engagement."
    },
    {
      id: 8,
      title: "Training Institute",
      description: "Professional training programs to upskill your team with industry-relevant expertise."
    },
    {
      id: 9,
      title: "Research and Consultancy",
      description: "In-depth research and expert consultancy to drive strategic business decisions."
    },
    {
      id: 10,
      title: "Data Science and Data Analytics",
      description: "Transform raw data into actionable insights for informed business strategies."
    }
  ]);

  // Map icons dynamically if API doesn’t send them
  const getIcon = (name) => {
    if (!name) return <Code className="w-10 h-10 text-accent" />;
    const lower = name.toLowerCase();
    if (lower.includes("web")) return <Code className="w-10 h-10 text-accent" />;
    if (lower.includes("mobile") || lower.includes("app")) return <Smartphone className="w-10 h-10 text-accent" />;
    if (lower.includes("ai")) return <Bot className="w-10 h-10 text-accent" />;
    if (lower.includes("automation")) return <Zap className="w-10 h-10 text-accent" />;
    if (lower.includes("graphic") || lower.includes("design")) return <Palette className="w-10 h-10 text-accent" />;
    if (lower.includes("digital marketing")) return <TrendingUp className="w-10 h-10 text-accent" />;
    if (lower.includes("social media")) return <Share2 className="w-10 h-10 text-accent" />;
    if (lower.includes("training")) return <GraduationCap className="w-10 h-10 text-accent" />;
    if (lower.includes("research") || lower.includes("consultancy")) return <Briefcase className="w-10 h-10 text-accent" />;
    if (lower.includes("data")) return <BarChart3 className="w-10 h-10 text-accent" />;
    return <Code className="w-10 h-10 text-accent" />;
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

      {/* Service Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.id || i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bgcard rounded-xl p-6 text-center hover:scale-105 transition-transform hover:shadow-accent"
              >
                <div className="flex justify-center mb-4">
                  {getIcon(s.title)}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-accent">
                  {s.title}
                </h3>
                <p className="mt-3 text-gray-200 text-sm sm:text-base">
                  {s.desc || s.description}
                </p>
                {/* <Link
                  to={`/services/${s.id}`}
                  className="mt-4 inline-block text-accent font-semibold hover:underline"
                >
                  Learn More →
                </Link> */}
              </motion.div>))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bgcard py-16 text-center rounded-2xl mx-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-accent">
          Let’s Build Your Next Project!
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