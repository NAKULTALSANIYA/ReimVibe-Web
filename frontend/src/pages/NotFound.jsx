import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, MessageCircle, Frown } from 'lucide-react';

function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const quickLinks = [
    { to: '/', label: 'Go Home', icon: Home, color: 'btn-primary' },
    // { to: '/services', label: 'Our Services', icon: Search, color: 'btn-outline' },
    // { to: '/contact', label: 'Contact Us', icon: MessageCircle, color: 'btn-outline' },
  ];

  return (
    <div className="min-h-screen bgname flex items-center justify-center px-6 py-12">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Large 404 with Animation */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8"
        >
          <motion.h1
            className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-accent"
            animate={{
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 20px rgba(34, 212, 236, 0.5)",
                "0 0 40px rgba(34, 212, 236, 0.8)",
                "0 0 20px rgba(34, 212, 236, 0.5)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            404
          </motion.h1>
          
          {/* Floating Icon */}
          <motion.div
            className="absolute -top-4 -right-4 sm:-right-8"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Frown className="text-accent w-12 h-12 sm:w-16 sm:h-16" />
          </motion.div>
        </motion.div>

        {/* Error Message Card */}
        <motion.div
          variants={itemVariants}
          className="bgcard rounded-2xl p-8 mb-8 shadow-2xl"
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Oops! Page Not Found
          </motion.h2>
          <motion.p
            className="text-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            variants={itemVariants}
          >
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, it happens to the best of us! Let's get you back on track.
          </motion.p>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.to}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.to}
                className={`${link.color} inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300`}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;